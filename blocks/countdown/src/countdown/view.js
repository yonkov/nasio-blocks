/**
 * Frontend JavaScript for the countdown block.
 */

/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is imported by index.js, it runs in the context of the editor.
 * When this file is compiled as part of the build process and loaded in the front end,
 * it runs in the context of the front end.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdowns();
});

function initializeCountdowns() {
    const countdowns = document.querySelectorAll('.wp-block-nasio-block-countdown');
    
    if (!countdowns.length) return;

    countdowns.forEach(function(countdown) {
        const targetDate = countdown.dataset.targetDate;
        const targetTime = countdown.dataset.targetTime;
        const daysLabel = countdown.dataset.daysLabel || 'Days';
        const hoursLabel = countdown.dataset.hoursLabel || 'Hours';
        const minutesLabel = countdown.dataset.minutesLabel || 'Minutes';
        const secondsLabel = countdown.dataset.secondsLabel || 'Seconds';
        const delimiter = countdown.dataset.delimiter || '';
        const unitPrefix = countdown.dataset.unitPrefix === 'true';

        if (!targetDate) return;

        // Get countdown elements
        const daysElement = countdown.querySelector('[data-unit="days"]');
        const hoursElement = countdown.querySelector('[data-unit="hours"]');
        const minutesElement = countdown.querySelector('[data-unit="minutes"]');
        const secondsElement = countdown.querySelector('[data-unit="seconds"]');

        function calculateTimeLeft() {
            const targetDateTime = new Date(`${targetDate} ${targetTime}`);
            const now = new Date();
            const difference = targetDateTime - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            } else {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
        }

        function formatNumber(num) {
            return unitPrefix ? num.toString().padStart(2, '0') : num.toString();
        }

        function updateCountdown() {
            const timeLeft = calculateTimeLeft();
            
            if (daysElement) daysElement.textContent = formatNumber(timeLeft.days);
            if (hoursElement) hoursElement.textContent = formatNumber(timeLeft.hours);
            if (minutesElement) minutesElement.textContent = formatNumber(timeLeft.minutes);
            if (secondsElement) secondsElement.textContent = formatNumber(timeLeft.seconds);
        }

        // Update immediately
        updateCountdown();

        // Update every second
        setInterval(updateCountdown, 1000);
    });
}
