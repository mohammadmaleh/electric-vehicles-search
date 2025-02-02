import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import type { CarsDBResponse } from '../../types/cars.type';

export async function GET(): Promise<NextResponse> {
  try {
    const filePath = path.join(process.cwd(), 'src/db', 'cars.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    const jsonData: CarsDBResponse[] = JSON.parse(fileData);

    const cars = jsonData.data;

    const count = jsonData.count;

    return NextResponse.json({
      count,
      cars,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: 'Failed to fetch cars' });
  }
}
