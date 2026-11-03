<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    // public function run(): void
    // {
    //     User::firstOrCreate(
    //         ['email' => 'admin@cortexacademy.com'],
    //         [
    //             'name' => 'Admin',
    //             'password' => 'password',
    //         ]
    //     );

    //     $this->call([
    //         CourseSeeder::class,
    //         ProgrammeSeeder::class,
    //         PaymentOptionSeeder::class,
    //         BundleSeeder::class,
    //     ]);
    // }
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@cortexacademy.com');
        $password = env('ADMIN_PASSWORD');

        // Production never gets a default password.
        if (! app()->isProduction() || $password) {
            $admin = User::firstOrCreate(
                ['email' => $email],
                ['name' => 'Admin', 'password' => $password ?: 'password']
            );

            $admin->forceFill([
                'is_admin' => true,
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => $admin->email_verified_at ?? now(),
            ])->save();
        }

        $this->call([
            CourseSeeder::class,
            ProgrammeSeeder::class,
            PaymentOptionSeeder::class,
            BundleSeeder::class,
            InstructorSeeder::class,
        ]);

        if (! app()->isProduction()) {
            $this->call(EnrollmentSeeder::class);
        }
    }
}
