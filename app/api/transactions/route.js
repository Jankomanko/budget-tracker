import prisma from '../../../lib/prisma';

export async function GET() {
    const transactions = await prisma.transaction.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return Response.json(transactions);
}

export async function POST(request) {
    const body = await request.json();

    const transaction = await prisma.transaction.create({
        data: {
            description: body.description,
            amount:      parseFloat(body.amount),
            type:        body.type,
            category:    body.category,
        },
    });

    return Response.json(transaction, { status: 201 });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    await prisma.transaction.delete({ where: { id } });

    return Response.json({ success: true });
}