export function generatePassword(length: number = 12): string {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const allCharacters = lowerCaseLetters + upperCaseLetters + digits;

    const passwordCharacters: string[] = [
        lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)],
        upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)],
        digits[Math.floor(Math.random() * digits.length)]
    ];

    for (let i = passwordCharacters.length; i < length; i++) {
        const randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        passwordCharacters.push(randomCharacter);
    }

    for (let i = passwordCharacters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordCharacters[i], passwordCharacters[j]] = [passwordCharacters[j], passwordCharacters[i]];
    }

    return passwordCharacters.join('');
}
