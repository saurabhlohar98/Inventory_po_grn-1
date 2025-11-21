# Inventory_po_grn-1
Version 1.0 date 18-11-2025


connect database SupaBase 
copy connection code and paste to .env file

steps to run code 
npm install

npm run start:dev

and open 
# POST  http://localhost:3000/api/po
select body format json 
 and paste this code
 {
"id": 1,
"po_no": "PO-002",
"po_date": "2025-10-13",
"sup_id": 101,
"rev_id": 1,
"with_trans": false,
"trans_amt": 0,
"details": [
{ "sr_no": 1, "pro_id": 101, "make": "Pen", "order_qty": 100, "rate": 15 },
{ "sr_no": 2, "pro_id": 102, "make": "Pencil", "order_qty": 100, "rate": 10 },
{ "sr_no": 3, "pro_id": 103, "make": "Book", "order_qty": 200, "rate": 80 }
]
}

#GET method to check the save data in supabase

POST http://localhost:3000/api/grn
select body format json 
 and paste this code
{
"grn_no": "GRN-1002",
"grn_date": "2025-10-15",
"sup_id": 101,
"po_id": 10,
"note": "partial delivery",
"details": [
{ "sr_no":1, "pro_id":101, "make_actual":"Pen", "qty":60, "rate":15 },
{ "sr_no":2, "pro_id":102, "make_actual":"Pencil", "qty":70, "rate":10 },
{ "sr_no":3, "pro_id":103, "make_actual":"book", "qty":150, "rate":80 }
]
}

GET http://localhost:3000/api/report/products
check report 
