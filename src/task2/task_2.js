/**
 ** Кейс-задача № 2
 ** Стилистическое преобразование чисел:
 ** Напишите программу, которая запрашивает у пользователя последовательно день его рождения, месяц и год;
 ** Напишите функцию, которая определяет какому дню недели соответствует эта дата?
 ** Напишите функцию, которая определяет - високосный это был год, или нет?
 ** Напишите функцию, которая определяет сколько сейчас лет пользователю;
 ** Реализуйте вывод в консоль даты рождения пользователя в формате дд мм гггг, где цифры прорисованы звёздочками (*), как на электронном табло.
 */

const readline = require("readline");

function promptUser(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(`\x1b[32m${question}\x1b[0m`, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function promptUserForDate() {
    let day, month, year;

    while (true) {
        day = parseInt(await promptUser("Введите день вашего рождения (1-31):"), 10);
        if (day >= 1 && day <= 31) break;
        console.log("\x1b[31mОшибка: день должен быть числом от 1 до 31.");
    }

    while (true) {
        month = parseInt(await promptUser("Введите месяц вашего рождения (1-12):"), 10) - 1;
        if (month >= 0 && month <= 11) break;
        console.log("\x1b[31mОшибка: месяц должен быть числом от 1 до 12.");
    }

    while (true) {
        year = parseInt(await promptUser("Введите год вашего рождения:"), 10);
        if (year >= 1 && year <= new Date().getFullYear()) break;
        console.log("\x1b[31mОшибка: год должен быть числом от 1 до текущего года.");
    }

    return new Date(year, month, day);
}

/**
 * Функция для определения дня недели
 * @param date
 * @returns {string}
 */
function getDayOfWeek(date) {
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    return days[date.getDay()];
}

/**
 * Функция для проверки високосного года
 * @param year
 * @returns {boolean}
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Функция для расчёта возраста пользователя
 * @param date
 * @returns {number}
 */
function calculateAge(date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();

    if (
        today.getMonth() < date.getMonth() ||
        (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
    ) {
        age--;
    }

    return age;
}

/**
 * Функция для отображения числа звёздочками
 * @param number
 * @returns {string[]}
 */
function renderNumberStars(number) {
    const digitPatterns = [
        [
            " **** ",
            "*    *",
            "*    *",
            "*    *",
            " **** "
        ],
        [
            "   *  ",
            "  **  ",
            "   *  ",
            "   *  ",
            "  *** "
        ],
        [
            " **** ",
            "     *",
            " **** ",
            "*     ",
            " *****"],
        [
            " **** ",
            "     *",
            " **** ",
            "     *",
            " **** "
        ],
        [
            "*    *",
            "*    *",
            "******",
            "     *",
            "     *"
        ],
        [
            " *****",
            "*     ",
            " **** ",
            "     *",
            " **** "
        ],
        [
            " **** ",
            "*     ",
            "***** ",
            "*    *",
            " **** "
        ],
        [
            " *****",
            "     *",
            "    * ",
            "   *  ",
            "  *   "
        ],
        [
            " **** ",
            "*    *",
            " **** ",
            "*    *",
            " **** "
        ],
        [
            " **** ",
            "*    *",
            " *****",
            "     *",
            " **** "
        ],
    ];

    return number
        .toString()
        .split("")
        .map((digit) => digitPatterns[parseInt(digit, 10)])
        .reduce((acc, pattern) => {
            pattern.forEach((line, index) => {
                acc[index] = (acc[index] || "") + line + " ";
            });
            return acc;
        }, []);
}

/**
 * Функция для вывода даты рождения звёздочками
 * @param date
 */
function renderDateStars(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayStars = renderNumberStars(day);
    const monthStars = renderNumberStars(month);
    const yearStars = renderNumberStars(year);

    const separator = ["       ", "       ", "       ", "       ", "   *   "];

    const result = dayStars.map((line, index) => {
        return `${line}${separator[index]}${monthStars[index]}${separator[index]}${yearStars[index]}`;
    });

    console.log("\x1b[32m", result.join("\n"));

}

(async function main() {
    const birthDate = await promptUserForDate();

    console.log(`\x1b[32mВы родились: ${birthDate.toLocaleDateString("ru-RU")} г.`);
    console.log(`\x1b[32mЭто был день недели: ${getDayOfWeek(birthDate)}`);
    console.log(`\x1b[32mГод ${birthDate.getFullYear()} ${isLeapYear(birthDate.getFullYear()) ? "был високосным" : "не был високосным"}`);
    console.log(`\x1b[32mВаш возраст: ${calculateAge(birthDate)} лет`);

    console.log("\x1b[32mДата вашего рождения:");
    renderDateStars(birthDate);
})();
