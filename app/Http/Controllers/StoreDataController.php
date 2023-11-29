<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoreMaintenance;

class StoreDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createGrabStore(Request $request)
    {
        $istoreValues = $request->json()->all();

        foreach ($istoreValues as $istore) {
            // Assuming $istore is a single value representing istore
            $insertData = [
                'istore' => $istore,
                'grab'   => 1,
                // Add other columns as needed
            ];

            // Use updateOrCreate to perform the upsert operation
            StoreMaintenance::updateOrCreate(
                ['istore' => $istore],
                $insertData
            );
        }

        $res = [
            'message' => 'Grab Stores Created successfully',
        ];

        return response()->json($res);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
