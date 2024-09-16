import { connectMongoDB } from "@/app/lib/mongodb";
import Name from "@/app/model/name";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    
    await connectMongoDB();
    const createdName = await Name.create({ name });
    return NextResponse.json({ message: "Name Created", data: createdName }, { status: 201 });
  } catch (error) {
    console.error("Error creating name:", error);  // Log the error for debugging
    return NextResponse.json({ error: "Failed to create name", details: error }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectMongoDB();
    const names = await Name.find();
    console.log('db coonected');
    
    return NextResponse.json({ names });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch names" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }
    await connectMongoDB();
    await Name.findByIdAndDelete(id);
    return NextResponse.json({ message: "Name deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete name" }, { status: 500 });
  }
}


export async function PUT(request: Request) {
    try {
      // Parse the request body
      const { id, name } = await request.json();
  
      // Check if both id and name are provided
      if (!id || !name) {
        return NextResponse.json({ error: "ID and name are required" }, { status: 400 });
      }
  
      // Connect to the database
      await connectMongoDB();
  
      // Find the document by ID and update it
      const updatedName = await Name.findByIdAndUpdate(id, { name }, { new: true });
  
      // Check if the document was found and updated
      if (!updatedName) {
        return NextResponse.json({ error: "Name not found" }, { status: 404 });
      }
  
      // Respond with the updated document
      return NextResponse.json({ message: "Name updated", data: updatedName }, { status: 200 });
    } catch (error) {
      console.error("Error updating name:", error);
      return NextResponse.json({ error: "Failed to update name", details: error }, { status: 500 });
    }
  }