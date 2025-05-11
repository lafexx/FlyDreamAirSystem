import { Value } from "../../../contexts/BookingContext";

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function applyAddDays(value: Value, days: number): Value {
    if (value instanceof Date) return addDays(value, days);
    if (Array.isArray(value)) {
      const [start, end] = value;
      return [
        start instanceof Date ? addDays(start, days) : null,
        end instanceof Date ? addDays(end, days) : null,
      ];
    }
    return null;
}