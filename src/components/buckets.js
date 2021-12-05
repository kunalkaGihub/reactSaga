import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableSortLabel, TableContainer } from "@material-ui/core";
import "./index.css";
import Navbar from "../../../components/Navbar";
import SideNav from "../../../components/SideNav";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { fetchBuckets, deleteBucket, updateBucket, addBucket} from '../../../actions/bucket';
import { Button, Modal } from "react-bootstrap";




const Buckets = ({match}) => {
      //  match: { params: { id } }

    let buckets = useSelector((state) => state.allBuckets.buckets)
     console.log(buckets)
     
     const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBuckets(match.params.id));
    }, []);
    
    
    const handleDelete = (id) =>{
        dispatch(deleteBucket(id))
    }

    const [editBucket, setEditBucket] = useState({id:"",title:"", description:""})
    
    const getEditBucket = (currentBucket) =>{
        refEdit.current.click();
        setEditBucket({id:currentBucket.id, title: currentBucket.title, description:currentBucket.description})  
      }

    const handleUpdate = (e) =>{
        e.preventDefault();
        dispatch(updateBucket(editBucket.id, editBucket.title, editBucket.description))
        setEditBucket({title:"", description:""})
        refClose.current.click();
    }

    const handleAdd = (e) =>{
        e.preventDefault();
        refAdd.current.click();
        dispatch(addBucket(buckets.length+1,editBucket.title, editBucket.description))
        //setEditBucket({title:"", description:""})
        refClose.current.click();
    }

    //Edit Modal 
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setEditBucket({title:"", description:""})
    };
    const handleShow = () => {
        setShow(true)
    };
    //edit modal end

    //Add Modal 
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClose = () => {
        setShowAdd(false)
        setEditBucket({title:"", description:""})
    };
    const handleAddShow = () => {
        console.log("showadd")
        setShowAdd(true)
    };
    //Add modal end
    
    const refEdit = useRef(null)
    const refAdd = useRef(null)
    const refClose = useRef(null)

    const onChange =(e) =>{
        //spread operator
        setEditBucket({...editBucket, [e.target.name]:e.target.value})
    }

    return (
        <div className="background">
            <div className="partition-grid">
                <SideNav />
                <div className="container-dash  ">
                    <Navbar pageHeading={"Contents Manager"} pageIcon={"appStore.svg"} />
                    <div className="grid-card">
                        <div className="flex-between">
                            <h4>Content Buckets</h4>
                            <button className="btn " onClick={handleAddShow} >Create Bucket</button>
                        </div>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S No.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Decription</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                  
                                     
                                    <TableBody>
                                    {buckets.map((bucket, index) =>( 
                                         <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Link to={`/contents/list/${match.params.id}`} style={{color:"black"}}>{bucket.title}</Link>
                                            </TableCell>
                                            <TableCell >
                                            <Link to={`/contents/list/${match.params.id}`} style={{color:"black"}}>{bucket.description} </Link>
                                            </TableCell>
                                            <TableCell><Moment format="YYYY/MM/DD,h:mm a"/></TableCell>
                                            <TableCell>
                                                <Link style={{color:"grey"}} onClick={()=>getEditBucket(bucket)}> <span >Edit</span>
                                                </Link> &nbsp;
                                                <Link onClick={()=>handleDelete(bucket.id)} style={{color:"red"}}><span>Remove</span></Link>
                                            </TableCell>
                                        </TableRow>   
                                    ))}
                                    </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </div>
                    <div className="container">
                    <Button ref={refEdit} onClick={handleShow} style={{display:"none"}}>Modal</Button>
                    <Modal show={show} style={{ width:"50%", top:"40%"}}>
                        <Modal.Header>
                            <Modal.Title style={{fontWeight:"bold"}}>Edit Bucket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form className="my-3">
                            {/* <div className="grid-card"> */}
                            
                            <div className="input-card">
                                <label for="" >
                                    Title <i class="bx bx-info-circle"></i>
                                </label>
                                <input
                                    className="form-input w-100"
                                    placeholder="Enter the title of the bucket"
                                    name="title"
                                    onChange={onChange}
                                    value={editBucket.title}
                                />
                            </div>
                            <div className="input-card">
                                <label for="">
                                    Description <i class="bx bx-info-circle"></i>
                                </label>
                                <textarea 
                                type="text" 
                                className="form__input h-100" 
                                placeholder="Enter description"
                                name="description"
                                onChange={onChange}
                                value={editBucket.description}>
                                </textarea> 
                            </div>
                        {/* </div> */}
                        </form>
                        </Modal.Body>
                        <Modal.Footer style={{display:"flex", marginTop:"20px"}}>
                        <Button variant="secondary" ref={refClose} onClick={handleClose} style={{marginRight:"2%"}}>Close</Button>
                        <Button 
                        disabled={editBucket.title.length<5 || editBucket.description.length<5} 
                        variant="primary" style={{marginLeft:"auto"}} 
                        onClick={handleUpdate}>
                            Update Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                    {/* Add */}
                    <div className="container">
                    {/* <Button ref={refAdd} onClick={handleAddShow} style={{display:"none"}}>Modal</Button> */}
                    <Modal show={showAdd} style={{width:"50%", top:"40%"}}>
                        <Modal.Header>
                            <Modal.Title style={{fontWeight:"bold"}}>Add Bucket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form className="my-3">
                            {/* <div className="grid-card"> */}
                            
                            <div className="input-card">
                                <label for="">
                                    Title <i class="bx bx-info-circle"></i>
                                </label>
                                <input
                                    className="form-input w-100"
                                    placeholder="Enter the title of the content"
                                    name="title"
                                    onChange={onChange}
                                    value={editBucket.title}
                                />
                            </div>
                            <div className="input-card">
                                <label for="">
                                    Description <i class="bx bx-info-circle"></i>
                                </label>
                                <textarea 
                                type="text" 
                                className="form__input h-100" 
                                placeholder="Enter description"
                                name="description"
                                onChange={onChange}
                                value={editBucket.description}>
                                </textarea> 
                            </div>
                        {/* </div> */}
                        </form>
                        </Modal.Body>
                        <Modal.Footer style={{display:"flex", marginTop:"20px"}}>
                        <Button variant="secondary" ref={refClose} onClick={handleAddClose} style={{marginRight:"2%"}}>Close</Button>
                        <Button 
                        onClick={handleAdd} style={{marginLeft:"auto"}}>
                            Add Bucket
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                </div>
            </div>
        </div>

    )

}

// const mapStateToProps = (state) => {
//     // return { project: state.project };
// };

// const mapDispatchToProps = (dispatch) => {
//     // return { project: state.project };
// };

export default connect()(Buckets);
