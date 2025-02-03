import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import type { Car, CarsDBResponse } from '../../types/cars.type';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('search') ?? '';

  try {
    const filePath = path.join(process.cwd(), 'src/db', 'cars.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    const jsonData: CarsDBResponse = JSON.parse(fileData);

    const cars = jsonData.data;

    const count = jsonData.count;

    const filteredCars = cars.filter((car: Car) => {
      const matchesSearch = search
        ? `${car.brand} ${car.model} ${car.location}`
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      return matchesSearch;
    });

    return NextResponse.json({
      count,
      cars: filteredCars,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: 'Failed to fetch cars' });
  }
}
