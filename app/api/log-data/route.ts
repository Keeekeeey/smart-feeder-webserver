import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request :NextRequest) {
    const apiKey = request.headers.get('authorization')?.replace('Bearer ','');

    if (apiKey !== process.env.API_SECRET_KEY){
        return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
    )};
    try{ 
        const { motion } = await request.json();

        if (motion !== 'boolean'){
            return NextResponse.json(
                { error : 'Motion must be of type boolean'},
                { status  : 400}
            )
        }

        await prisma.motionEvent.create({
                data: {
                    motion: motion,
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
