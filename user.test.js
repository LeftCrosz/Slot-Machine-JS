import { User } from './user.js';

test('addBalance increases balance correctly', () => {
    const player = new User('Test', 100);
    player.addBalance(50);
    expect(player.balance).toBe(150);
});

test('addBalance rejects negative amounts', () => {
    const player = new User('Test', 100);
    player.addBalance(-50);
    expect(player.balance).toBe(100);
});