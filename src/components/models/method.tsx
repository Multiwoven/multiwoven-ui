import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AWS from '../../assets/images/redshift.svg'
import SQL from '../../assets/images/sql.png'
import DBT from '../../assets/images/dbt.png'
import Table from '../../assets/images/table.png'
import { Breadcrumb } from '../common/breadcrumb';
import {
    PhoneIcon,
    EnvelopeIcon,
    CircleStackIcon,
  } from '@heroicons/react/20/solid'

const ModelMethod: React.FC = () => {
    const params = useParams();
    const id = params.id;

    const models = [
        {
            methodName:"SQL Query",
            description:"Filter, transform, and join your data using an SQL Query. ",
            icon:SQL
        }, {
            methodName:"Table Selector",
            description:"Read all rows from an existing Table or View from your database.",
            icon:Table
        }, {
            methodName:"dbt model",
            description:"Use a table or materialized view generated by dbt.",
            icon:DBT
        }
    ]

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                <Breadcrumb />
            </div>
 
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 pt-10">
            {models.map((model) => (
                <li
                key={model.methodName}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:bg-slate-50 cursor-pointer"
                >
                    <Link to={"/models/new/"+ id + "/define" }>
                        <div className="flex flex-1 flex-col p-8">
                            <img className="mx-auto h-24 w-24 flex-shrink-0" src={model.icon} alt="" />
                            <h3 className="mt-6 text-xl font-bold text-gray-900">{model.methodName}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-md font-normal text-gray-500">{model.description}</dd>
                            </dl>
                        </div>
                    </Link>
                </li>
            ))}
            </ul>
            </div>
        </>
    );
}

export default ModelMethod;
