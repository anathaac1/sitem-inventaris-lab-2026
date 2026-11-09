<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * Catatan:
 * Factory buat model User.
 * Dipake waktu testing / pembuatan data dummy otomatis lewat Faker.
 * Otomatis bikin nama acak, email unik acak, password default 'password', dan token pengingat.
 *
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Cache password default yang dipakai oleh factory.
     */
    protected static ?string $password;

    /**
     * Definisi nilai default atribut model User saat di-generate.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * State untuk menandai user yang email-nya belum terverifikasi.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * State untuk user dengan Two-Factor Authentication aktif.
     */
    public function withTwoFactor(): static {}
}
