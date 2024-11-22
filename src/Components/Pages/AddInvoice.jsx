
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { useEffect, useState } from 'react'
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { Autocomplete, AutocompleteOption, Button, Input, ListItemContent, Typography } from '@mui/joy';
import axios from 'axios';
export default function AddInvoice() {
    var [StorageOptions, setStorageOptions] = useState()
    var [CustomerOptions, setCustomerOptions] = useState()
    var [invoiceDetail, setInvoiceDetail] = useState([{ discount2: 0, signedForDelete: false,rowIndex:0 }])
    var [data, setData] = useState({
        invoiceState: 0,
        invoiceType: 0,
        isFormal: false
    })

    var [ProductOptions, setProductOptions] = useState()

    function consolea(e) {
        e.preventDefault()
        data.invoiceDetails = invoiceDetail
        console.log(data)
    }

    useEffect(() => {
        axios.get('https://taxpayers.irkhadamat.com/api/Storage/GetAll', { headers: { token: localStorage.getItem('token') } }).then(res => {
            setStorageOptions(res.data.data)
            console.log(res)
        })
        axios.post('https://taxpayers.irkhadamat.com/api/Customer/GetAll', {
            "name": null,
            "mobile": null,
            "nationalCode": null
        }, { headers: { token: localStorage.getItem('token') } }).then(res => {
            setCustomerOptions(res.data.data)
            console.log(res)
        })
        axios.post('https://taxpayers.irkhadamat.com/api/Product/GetAll', {
            "typeID": null,
            "model": null,
            "code": null
        }, { headers: { token: localStorage.getItem('token') } }).then(res => {
            setProductOptions(res.data.data)
            console.log(res)
        })
    }, [])
    function addNewInvoiceDetail() {
        var newInvoiceDetail = ({ discount2: 0, signedForDelete: false,rowIndex:invoiceDetail[invoiceDetail.length-1].rowIndex+1 })
        setInvoiceDetail([...invoiceDetail,newInvoiceDetail])
    }
    function removeInvoiceDetail(index){
        let data = [...invoiceDetail];
        data.splice(index, 1)
        setInvoiceDetail(data)
    }
    return (
        <div className='w-full' >
            <div className='container flex justify-start mx-3 my-4' dir='rtl' >
                <h2 class='text-3xl' >فاکتور جدید محصول </h2>
            </div>
            <LocalizationProvider dateAdapter={AdapterMomentJalaali} >
                <form className='grid grid-cols-4 p-12 container flex-wrap ' onSubmit={(e) => consolea(e)} dir='rtl' >
                    <div className='' >
                        <label>شماره فاکتور</label>
                        <Input color="neutral" className='mx-3 ' onChange={(e) => data.manualInvoiceNumber = e.target.value} style={{ fontFamily: 'Rubik' }} placeholder='شماره فاکتور' required variant="outlined" />
                    </div>
                    <div className='flex flex-col mx-3 mb-3 ' >
                        <label>تاریخ فاکتور</label>
                        <DatePicker onChange={(e) => data.invoiceDate = (`${e._d.getFullYear()}-${e._d.getMonth()}-${e._d.getDate()}`)} class='mx-3 ' />
                    </div>
                    <div className='' >
                        <label>هزینه ارسال</label>
                        <Input onChange={(e) => data.freightCharge = Number(e.target.value)} startDecorator={<p>تومان</p>} color="neutral" className='mx-3 ' style={{ fontFamily: 'Rubik' }} type='number' placeholder='100000' required variant="outlined" />
                    </div>
                    <div className='' >
                        <label>تخفیف</label>
                        <Input color="neutral" onChange={(e) => data.discount = Number(e.target.value)} startDecorator={<p>تومان</p>} className='mx-3 ' type='number' style={{ fontFamily: 'Rubik' }} placeholder='100000' required variant="outlined" />
                    </div>
                    <div className='' >
                        <label>شماره استعلام مالیات</label>
                        <Input color="neutral" onChange={(e) => data.taxInquiryID = e.target.value} className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='شماره استعلام مالیاتی' required variant="outlined" />
                    </div>
                    <div className='' >
                        <label>شماره مالیاتی</label>
                        <Input color="neutral" onChange={(e) => data.taxID = e.target.value} className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='شماره مالیاتی' required variant="outlined" />
                    </div>
                    <div className='' >
                        <label>شماره مرجع اداره مالیات</label>
                        <Input color="neutral" onChange={(e) => data.taxOfficeRefNumber = e.target.value} className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='شماره مرجع اداره مالیات' required variant="outlined" />
                    </div>
                    <div className='' >
                        <label>انبار مبداء</label>
                        <Autocomplete dir='rtl' color="neutral" onChange={(e, newVal) => data.destinationStorageID = newVal.id} getOptionLabel={e => e.storageName} className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} options={StorageOptions}
                            renderOption={(props, option) => (
                                <AutocompleteOption dir='rtl' {...props} >
                                    <ListItemContent sx={{ fontSize: 'sm' }}>
                                        <p style={{ fontFamily: "Rubik" }} >{option.storageName}</p>
                                        <Typography style={{ fontFamily: "Rubik" }} level="body-xs">
                                            {option.storageAddress}
                                        </Typography>
                                    </ListItemContent>
                                </AutocompleteOption>
                            )}
                            placeholder='انبار مبدا' required variant="outlined" />
                    </div>
                    <div className='mt-5' >
                        <label>مشتری</label>
                        <Autocomplete
                            dir='rtl'
                            color="neutral"
                            onChange={(e, newVal) => data.customerId = newVal.id}
                            getOptionLabel={e => e.name}
                            className='mx-3 mt-1'
                            style={{ fontFamily: 'Rubik' }}
                            options={CustomerOptions}
                            renderOption={(props, option) => (
                                <AutocompleteOption dir='rtl' {...props} >
                                    <ListItemContent sx={{ fontSize: 'sm' }}>
                                        <p style={{ fontFamily: "Rubik" }} >{option.name}</p>
                                        <Typography style={{ fontFamily: "Rubik" }} level="body-xs">
                                            {option.mobile}
                                        </Typography>
                                    </ListItemContent>
                                </AutocompleteOption>
                            )}
                            placeholder='مشتری'
                            required
                            variant="outlined"
                        />
                    </div>
                    <div className='mt-5' >
                        <label>هزینه مالیات </label>
                        <Input color="neutral" onChange={(e) => data.taxFee = Number(e.target.value)} startDecorator={<p>تومان</p>} type='number' className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='100000' required variant="outlined" />
                    </div>
                    <div className='col-span-4' >
                        {invoiceDetail.map((e, index) => {
                            return ( 



                                <div key={index} className='mt-5' >
                                    <hr />

                                    <div className='grid grid-cols-4' >
                                        <div className='my-5' >
                                            <label>محصول</label>
                                            <Autocomplete
                                                dir='rtl'
                                                color="neutral"
                                                onChange={(e, newVal) => invoiceDetail[index].productID = newVal.id}
                                                getOptionLabel={e => e.name}
                                                className='mx-3 mt-1'
                                                style={{ fontFamily: 'Rubik' }}
                                                options={ProductOptions}
                                                renderOption={(props, option) => (
                                                    <AutocompleteOption dir='rtl' {...props} >
                                                        <ListItemContent sx={{ fontSize: 'sm' }}>
                                                            <p style={{ fontFamily: "Rubik" }} >{option.name}</p>
                                                            <Typography style={{ fontFamily: "Rubik" }} level="body-xs">
                                                                {option.model}
                                                            </Typography>
                                                        </ListItemContent>
                                                    </AutocompleteOption>
                                                )}
                                                placeholder='محصول'
                                                required
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className='my-5' >
                                            <label>تعداد</label>
                                            <Input color="neutral" onChange={(e) => invoiceDetail[index].productCount = Number(e.target.value)} type='number' className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='تعداد' required variant="outlined" />
                                        </div>
                                        <div className='my-5' >
                                            <label>قیمت هر محصول</label>
                                            <Input color="neutral" onChange={(e) => invoiceDetail[index].unitPrice = Number(e.target.value)} startDecorator={<p>تومان</p>} type='number' className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='100000' required variant="outlined" />
                                        </div>
                                        <div className='my-5' >
                                            <label>درصد تخفیف</label>
                                            <Input color="neutral" onChange={(e) => invoiceDetail[index].discountPercent = Number(e.target.value)} startDecorator={<p>%</p>} type='number' className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='10' required variant="outlined" />
                                        </div>
                                        <div className='my-5' >
                                            <label>درصد مالیات</label>
                                            <Input color="neutral" onChange={(e) => invoiceDetail[index].taxPercent = Number(e.target.value)} startDecorator={<p>%</p>} type='number' className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='10' required variant="outlined" />
                                        </div>
                                        <div className='my-5' >
                                            <label>قیمت خرید</label>
                                            <Input color="neutral" onChange={(e) => invoiceDetail[index].purchasePrice = Number(e.target.value)} startDecorator={<p>تومان</p>} type='number' className='mx-3 mt-1' style={{ fontFamily: 'Rubik' }} placeholder='100000' required variant="outlined" />
                                        </div>
                                        <div className='my-12'>

                                                <Button color='danger' onClick={()=>removeInvoiceDetail(index)} > حذف </Button>
                                        </div>
                                    </div>

                                    <hr />
                                </div>
                            )
                        })}
                        <div className='mt-10' >
                            <Button onClick={() => {addNewInvoiceDetail()}} >محصول جدید + </Button>
                        </div>
                    </div>
                    <div className=' mt-20' >
                        <Button className='' type='submit' >ثبت فاکتور</Button>
                    </div>
                </form>
            </LocalizationProvider >

        </div>
    )
}
