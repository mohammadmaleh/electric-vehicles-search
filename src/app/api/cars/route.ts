import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import type { CarsDBResponse } from '../../types/cars.type';

export async function GET(): Promise<NextResponse> {
  try {
    const filePath = path.join(process.cwd(), 'src/db', 'cars.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    const jsonData: CarsDBResponse[] = JSON.parse(fileData);

    return NextResponse.json({
      count: jsonData.length,
      data: jsonData,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: 'Failed to fetch cars' });
  }
}
