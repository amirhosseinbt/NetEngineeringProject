'use client'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SubTabsDB} from "@/data/db";
import SubTabContent from "@/components/SubTabsContent";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {updateSubTab} from "@/redux/features/tabSlice";

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    return <>
        <Tabs defaultValue="UserInformation" className="w-full">
            <TabsList className='mt-4 grid h-auto w-full grid-cols-1 gap-2 rounded-xl bg-[#edf2ff] p-2 sm:grid-cols-3'>
                {
                    SubTabsDB.map((item) => (
                        <TabsTrigger key={item.id} value={item.value}
                                     onClick={()=>dispatch(updateSubTab(item.value))}
                                     className='cursor-pointer flex items-center justify-center rounded-lg py-2.5 text-sm font-extrabold data-[state=active]:bg-[#4771F1] data-[state=active]:text-white'
                        >{item.name}</TabsTrigger>
                    ))
                }
            </TabsList>
        </Tabs>
        <div className='mt-4'>
            <SubTabContent/>
        </div>
    </>
}
