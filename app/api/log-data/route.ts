import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request : NextRequest) {
    const apiKey = request.headers.get('authorization')?.replace('Bearer ','');
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    if (apiKey !== process.env.API_SECRET_KEY){
        return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
    )};
    try{ 
        const { catName } = await request.json();
        if (catName === undefined || catName === null) {
            return NextResponse.json(
                { error : 'catName must be of type string'},
                { status  : 400}
            )
        }

        
        let cat_visit_count = await prisma.motionEvent.groupBy({
            by: ['catName'],
            where: {
                timestamp: {
                    gte: start,
                    lte: end
                }
            },
            _count: { catName: true },
            _max: { timestamp: true }
        });

        const match = cat_visit_count.find(e => e.catName === catName);
        const visits = match ? match._count.catName : 0;

        await prisma.motionEvent.create({
                data: {
                    catName: catName,
                    timestamp: new Date(),
                    visits: visits
                }
            });

        
        return NextResponse.json(
            { success : true}, 
            { status : 201 }
        );
    } catch (error) {
    console.error('Error logging data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}