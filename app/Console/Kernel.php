<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $context = stream_context_create(['http' => ['timeout' => 60 * 60 * 5]]);

        $schedule->call(function () use ($context) {
            try {
                file_get_contents('http://localhost:8802/api/ssd/sftp/price-job-update', false, $context);

                // Process the response or handle success
                // ...
            } catch (\Exception $e) {
                // Log any errors
                Log::error('Error during scheduled task: ' . $e->getMessage());
            }
        })->dailyAt('04:00'); // Last Run 12/04  04:15 PM - 06:18 PM | 12/05 09:46 AM - 11:05 AM


        $schedule->call(function () use ($context) {
            try {
                file_get_contents('http://localhost:8802/api/ssd/sftp/stock-update', false, $context);

                // Process the response or handle success
                // ...
            } catch (\Exception $e) {
                // Log any errors
                Log::error('Error during scheduled task: ' . $e->getMessage());
            }
        })->dailyAt('07:00'); //12/05 11:30 AM - 12:07 PM
        //everyTwoHours(); - For Usage in Upscaling
        //

        $schedule->call(function () use ($context) {
            try {
                file_get_contents('http://localhost:8802/api/ssd/sftp/grab-cron-update', false, $context);

                // Process the response or handle success
                // ...
            } catch (\Exception $e) {
                // Log any errors
                Log::error('Error during scheduled task: ' . $e->getMessage());
            }
        })->dailyAt('08:59');
    }


    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
