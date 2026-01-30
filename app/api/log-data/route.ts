import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request : NextRequest) {
    const apiKey = request.headers.get('authorization')?.replace('Bearer ','');

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

        await prisma.motionEvent.create({
                data: {
                    catName: catName,
                    timestamp: new Date()
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