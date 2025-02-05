import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import type { Car, CarsDBResponse } from '@/app/types/cars.type';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    console.log({ id });

    const filePath = path.join(process.cwd(), 'src/db', 'cars.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    const jsonData: CarsDBResponse = JSON.parse(fileData);

    if (!id) {
      return NextResponse.json({ error: 'Missing car ID' }, { status: 400 });
    }

    const carId = Number(id);

    if (isNaN(carId)) {
      return NextResponse.json(
        { error: 'Invalid car ID format' },
        { status: 400 },
      );
    }

    const car = jsonData.data.find((c: Car) => c.id === carId);

    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
