<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'title' => 'Introduction to Web Development',
            'description' => 'Learn the basics of HTML, CSS, and JavaScript.',
            'thumbnail' => '/placeholder.svg',
            'category' => 'Programming',
            'instructor' => 'John Doe',
            'duration' => '8 weeks',
            'students' => 1234,
            'rating' => 4.8,
            'price' => 'Free',
            'level' => 'Beginner',
            'isPremium' => false
        ]);

        Course::create([
            'title' => 'Advanced React Development',
            'description' => 'Master React hooks, context, and advanced patterns.',
            'thumbnail' => '/placeholder.svg',
            'category' => 'Programming',
            'instructor' => 'Jane Smith',
            'duration' => '12 weeks',
            'students' => 856,
            'rating' => 4.9,
            'price' => 'Premium',
            'level' => 'Advanced',
            'isPremium' => true
        ]);
    }
}
