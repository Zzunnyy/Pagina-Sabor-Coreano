<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    private const MINUTOS_VALIDEZ = 15;

    /**
     * Genera un código de 6 dígitos y lo "envía" por correo (con MAIL_MAILER=log,
     * queda escrito en storage/logs/laravel.log en vez de llegar a una bandeja real).
     */
    public function enviarCodigo(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if ($user) {
            $codigo = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $data['email']],
                ['token' => $codigo, 'created_at' => now()]
            );

            Mail::raw(
                "Tu código de verificación es: {$codigo}. Vence en " . self::MINUTOS_VALIDEZ . ' minutos.',
                function ($message) use ($data) {
                    $message->to($data['email'])->subject('Código de recuperación de contraseña');
                }
            );
        }

        // Mismo mensaje exista o no el email, para no revelar qué correos están registrados.
        return response()->json([
            'message' => 'Si el correo está registrado, te enviamos un código de verificación.',
        ]);
    }

    /**
     * Confirma si el código ingresado es válido, sin gastarlo todavía
     * (permite avisarle al usuario antes de que escriba la nueva contraseña).
     */
    public function verificarCodigo(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'string'],
        ]);

        $this->validarCodigoOFallar($data['email'], $data['code']);

        return response()->json(['message' => 'Código válido.']);
    }

    /**
     * Verifica el código de nuevo (por si venció entre medio) y cambia la contraseña.
     */
    public function resetear(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $this->validarCodigoOFallar($data['email'], $data['code']);

        User::where('email', $data['email'])->update([
            'password' => Hash::make($data['password']),
        ]);

        DB::table('password_reset_tokens')->where('email', $data['email'])->delete();

        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }

    private function validarCodigoOFallar(string $email, string $code): void
    {
        $registro = DB::table('password_reset_tokens')->where('email', $email)->first();

        $esValido = $registro
            && $registro->token === $code
            && now()->diffInMinutes($registro->created_at) <= self::MINUTOS_VALIDEZ;

        if (! $esValido) {
            throw ValidationException::withMessages([
                'code' => ['El código es inválido o ya venció.'],
            ]);
        }
    }
}
