const actualMoment = jest.requireActual('moment');

const mockMoment = jest.fn(() => actualMoment('2020-01-01T00:00:00Z'));
mockMoment.default = mockMoment;
Object.assign(mockMoment, actualMoment);

module.exports = mockMoment;
