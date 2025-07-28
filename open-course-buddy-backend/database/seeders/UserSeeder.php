<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);

        // 2. Instructor (Pengajar)
        User::create([
            'name' => 'Instructor User',
            'email' => 'instructor@example.com',
            'role' => 'instructor',
            'password' => Hash::make('password'),
        ]);

        // 3. Regular User (Siswa)
        User::create([
            'name' => 'Student User',
            'email' => 'student@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);
    }
}