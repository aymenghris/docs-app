/**
 * Generates a deterministic HSL color based on a string input.
 * @param {string} name - The input string (e.g., a username)
 * @returns {string} - A CSS HSL color string
 *
 * Example with "Zoe".
 * 1. Get ASCII codes:
 *  Z = 90
 *  o = 111
 *  e = 101
 * 2. Sum them up:
 *  90 + 111 + 101 = 302
 * 3. Calculate Hue:
 *  302 % 360 = 302
 * 3. Result:
 *  hsl(302, 80%, 60%)
 * On the color wheel, 302° is a Magenta/Pink color.
 */
export const generateColorFromName = (name: string): string => {
    /**
     * 1. Convert the name to a total number (checksum)
     * It splits the string into individual characters and uses .reduce() to loop through them.
     * It looks up the ASCII (Unicode) code for each character and adds them together.
     *
     * - char.charCodeAt(0) turns a letter into an integer (e.g., 'a' = 97, 'A' = 65).
     * - It sums these integers to get a total score for the name.
     */
    const nameToNumber = name.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0)
    }, 0)

    /**
     * 2. Map that number to a range of 0-360 (degrees on color wheel)
     *  The total sum of the characters can be very large (e.g., 500, 1200, etc.).
     *  A color wheel only goes from 0 to 360 degrees
     */

    const hue = Math.abs(nameToNumber) % 360

    /**
     * 3. Return the HSL string with fixed saturation and lightness
     *  80% Saturation: Ensures the color is vibrant.
     *  60% Lightness: Ensures the color is bright enough to read but not washed out.
     *  By keeping these two fixed, the generated colors look consistent and aesthetically pleasing together,
     *  even though they are different colors.
     */

    return `hsl(${hue}, 80%, 60%)`
}
