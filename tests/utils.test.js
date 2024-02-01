const { convertDate } = require('../scripts/utils')

describe('convertDate', () => {
  it('deve converter uma data no formato correto', () => {
    const date = '2023-12-25T10:30:00Z';
    const formattedDate = convertDate(date);

    expect(formattedDate).toBe('25.12.2023');
  });
});
