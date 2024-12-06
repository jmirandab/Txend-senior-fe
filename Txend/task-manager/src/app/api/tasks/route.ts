import { NextResponse } from "next/server";

let rows = [
        { id: 1, title: "task1", description: "task created by Jon", status: "Pending" },
        { id: 2, title: "task2", description: "task created by Cersei", status: "Completed" },
        { id: 3, title: "task3", description: "task created by  Jaime", status: "Pending" },
        { id: 4, title: "task4", description: "Can delete", status: "Pending" },
      ];


export const GET = async (req: Request, res: Response) => {

    return NextResponse.json({ rows: rows }, { status: 200 });
}

export const DELETE = async (req: Request, res: Response) => {
    const url = new URL( req.url);
    const params = new URLSearchParams(url.search);
    const idToDelete = params.get("id");
    rows = rows.filter((r)=>{
        return r.id != Number(idToDelete);
    })
    /// Need to handle when id is not found
    console.log("DELETE filtred ", rows)

    return NextResponse.json({ rows: rows }, { status: 200 });
}

export const POST = async (req: Request, res: Response) => {
    console.log("Post called", req)
    const formData = await req.json();
    const formDataKeys = Object.keys(formData)
    console.log("Post formDataKeys", formDataKeys)
    console.log("Post formData", formData);
    rows = rows.concat({
        id: (rows[rows.length-1].id) + 1 , title: formData.title, description:  formData.description, status: formData.Status  
    })
    console.log("new ",rows);
    return NextResponse.json({ rows: rows}, { status: 200 });
}