import * as _React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { ShopProps, useGetOrder } from '../../customHooks';
import { useEffect, useState } from 'react';
import { MessageType } from '../Auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SubmitProps } from '../Shop/Shop';
import { serverCalls } from '../../api';
import { 
    Alert,
     Button,
      Dialog, 
      DialogActions,
       DialogContent, 
       DialogContentText, 
       Snackbar,
       Box
} from '@mui/material';
import { InputText } from '../sharedComponents';

const columns: GridColDef[] = [
    { field: 'image', //thats what needs to match the keys on our objects/dictionaries
         headerName: 'Image', //this is whats being displayed as the column header
        width: 150,
        renderCell: (param) => ( //we are rendering html thats why we have () not {}
            <img 
            src={param.row.image} //param is whole list, row is object in that list, image is key on that object
            alt={param.row.name}
            style = {{ maxHeight: '100%', aspectRatio: '1/1'}} //making this a square no matter what size our image is 
            ></img>
        ) 
    },{
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 110,
    editable: true,
  }
];


interface UpdateProps{
    id:string,
    orderData:ShopProps[]
}

const UpdateQuantity = (props:UpdateProps) =>{
    const [openAlert, setOpen] = useState(false);
    const [message,setMessage]= useState<string>();
    const [messageType,setMessageType]=useState<MessageType>();
    const { register, handleSubmit } = useForm<SubmitProps>({});


    useEffect(()=>{
        if(props.id==='undefined'){
            setMessage('No order selected to update.');
            setMessageType('error');
            setOpen(true);
            setTimeout(()  => window.location.reload(), 2000)
        }
    },[])

    const onSubmit:SubmitHandler<SubmitProps> = async (data: SubmitProps, event) => {
        if(event) {
            event.preventDefault()
        };

        let orderId=""
        let prodId=""

        for(let order of props.orderData){
            if(order.id===props.id){
                orderId=order.order_id as string;
                prodId=order.prod_id;
            }
        }

        const updateData = {
            "prod_id" : prodId,
            "quantity" : data.quantity
        }

        const response = await serverCalls.updateData(orderId, updateData)
        if (response.status === 200){
            setMessage('Successfully updated item in your Order')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        }

        
    }

    return(
        <Box sx={{padding: '20px'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor="quantity">What is the updated quantity?</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='Quantity Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={openAlert}
                // autoHideDuration={3000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}


export default function Orders() {

    const {orderData} = useGetOrder();
    const [gridData, setGridData]= useState<GridRowSelectionModel>([]);
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const [ openDialog, setDialogOpen ] = useState(false); // this hook will open up our Update Quantity Dialog Box


    const deleteItem= async()=>{
        const id = `${gridData[0]}`;

        let orderId=''
        let prodId=""

        if(id==='undefined'){
            setMessage("No Order Selected");
            setMessageType("error");
            setOpen(true);
            setTimeout(()=> window.location.reload(), 2000)
        }

        for(let order of orderData){
            if(order.id===id){
                orderId=order.order_id as string;
                prodId=order.prod_id as string;
            }
        }

        const deleteData = {
            'prod_id': prodId
        }

        const response = await serverCalls.deleteOrder(orderId,deleteData)

        if(response.status==200){
            setMessage('Order Deleted');
            setMessageType('success');
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        }else{
            setMessage('Order Deletion Failed: '+response.message);
            setMessageType('error');
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        }

    }

    
  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor:"white"}}>
      <DataGrid
        rows={orderData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange = {(newSelectionModel) => setGridData(newSelectionModel)}
      />
      <Button variant='contained' color='info' onClick={()=> setDialogOpen(true)}>Update</Button>
      <Button variant='contained' color='warning' onClick={deleteItem}>Delete</Button>
      <Dialog open={openDialog} onClose={()=> setDialogOpen(false)}>
        <DialogContent>
            <DialogContentText>Order id: {gridData[0]}</DialogContentText>
        </DialogContent>
        <UpdateQuantity id={`${gridData[0]}`} orderData = {orderData} />
        <DialogActions>
            <Button onClick = { ()=> setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={()=> setOpen(false)}
        >
            <Alert severity = {messageType}>
                {message}
            </Alert>
        </Snackbar>
    </Box>
  );
}

