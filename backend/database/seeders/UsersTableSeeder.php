<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Riyu Rindani Riandini',
            'role' => 'admin',
            'phone' => '6281219701683',
            'address' => 'BDB2 AD08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Budi Setiawanto',
            'role' => 'member',
            'phone' => '6281288004251',
            'address' => 'BDB2 AF- RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Rini Ruliawati',
            'role' => 'member',
            'phone' => '6282116203122',
            'address' => 'BDB2 AF-00 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Junaidi',
            'role' => 'member',
            'phone' => '6281315157413',
            'address' => 'BDB2 AF-00 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Kurniastuti Ikasari',
            'role' => 'member',
            'phone' => '6281311088061',
            'address' => 'BDB2 AC-05 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Hermanto',
            'role' => 'member',
            'phone' => '6281318039248',
            'address' => 'BDB2 AF-00 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Anwarul Fatah',
            'role' => 'member',
            'phone' => '628128424218',
            'address' => 'BDB2 AH-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Dodot Heru Susilo',
            'role' => 'member',
            'phone' => '6282143731961',
            'address' => 'BDB2 AE-04 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Rusmana',
            'role' => 'member',
            'phone' => '6281319424055',
            'address' => 'BDB2 AO-01 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Sholihin Prihartono',
            'role' => 'member',
            'phone' => '628161341288',
            'address' => 'BDB2 AC-17 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Lidya Sri Anggraini',
            'role' => 'member',
            'phone' => '6281317242420',
            'address' => 'BDB2 AD-07 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Irwan Muhammad Iqbal',
            'role' => 'member',
            'phone' => '6285776186640',
            'address' => 'BDB2 AD-07 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Iwan Sukmawan',
            'role' => 'member',
            'phone' => '6281513411241',
            'address' => 'BDB2 AD-06 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Sumarno',
            'role' => 'member',
            'phone' => '6281210134480',
            'address' => 'BDB2 AH-06 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Harris Gunawan',
            'role' => 'member',
            'phone' => '628129401789',
            'address' => 'BDB2 AH-11 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Erman',
            'role' => 'member',
            'phone' => '6285782458616',
            'address' => 'BDB2 AF-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Turyanto Nugroho',
            'role' => 'member',
            'phone' => '6285216948554',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Tatang R Suparman',
            'role' => 'member',
            'phone' => '6287770438728',
            'address' => 'BDB2 AE-10 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Yaasin Imam Prasetyo',
            'role' => 'member',
            'phone' => '62856354899',
            'address' => 'BDB2 AC-09 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Isti Anah',
            'role' => 'member',
            'phone' => '6285694470917',
            'address' => 'BDB2 AO-05 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Nur Endah Kusumawati',
            'role' => 'member',
            'phone' => '628174928362',
            'address' => 'BDB2 AO-04 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Darsiman Hadiwidjaya',
            'role' => 'member',
            'phone' => '6281317539118',
            'address' => 'BDB2 AO-04 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Sri Hartati',
            'role' => 'member',
            'phone' => '6281281157926',
            'address' => 'BDB2 AE-09 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Ramli',
            'role' => 'member',
            'phone' => '6287873027574',
            'address' => 'BDB2 AO-02 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Santy Negara Sari',
            'role' => 'member',
            'phone' => '6281511321242',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Kartum Setiawan',
            'role' => 'member',
            'phone' => '628179940173',
            'address' => 'BDB2 AG-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Asih Siswantini',
            'role' => 'member',
            'phone' => '6283876020855',
            'address' => 'BDB2 AC-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Masdar',
            'role' => 'member',
            'phone' => '628121847314',
            'address' => 'BDB2 AJ-07 RT001/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Pepen Suhendi',
            'role' => 'member',
            'phone' => '6281398018701',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Wiwit Suwito',
            'role' => 'member',
            'phone' => '628128990548',
            'address' => 'BDB2 AE-12A RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Sujarwo',
            'role' => 'member',
            'phone' => '6281283018728',
            'address' => 'BDB2 AG-05 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Supriyono',
            'role' => 'member',
            'phone' => '6282122530768',
            'address' => 'BDB2 AC-15 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Marfuah Musthofa',
            'role' => 'member',
            'phone' => '6281311343081',
            'address' => 'BDB2 AC-14 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Sari Wardhani Tambunan',
            'role' => 'member',
            'phone' => '6285880154561',
            'address' => 'BDB2 AD-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Nahl Firmana',
            'role' => 'member',
            'phone' => '62812197016830', //duplicate
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => "An'Niza Dwinda Handayani",
            'role' => 'member',
            'phone' => '6281285099662',
            'address' => 'BDB2 AW-01 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Rubedo Dirahayu',
            'role' => 'member',
            'phone' => '6281511989249',
            'address' => 'BDB2 BY-06 RT001/015',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Ira Kartika',
            'role' => 'member',
            'phone' => '6285882592988',
            'address' => 'BDB2 CA-05 RT004/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Agus Triono',
            'role' => 'member',
            'phone' => '6281808466111',
            'address' => 'BDB2 AG-04 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Widia Kaniawati',
            'role' => 'member',
            'phone' => '628159524624',
            'address' => 'BDB2 AO-01 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Muhammad Haris',
            'role' => 'member',
            'phone' => '6282124830807',
            'address' => 'BDB2 AP-05 RT006/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Fattah Fajar Ramadhan',
            'role' => 'member',
            'phone' => '6282110912873',
            'address' => 'BDB2 AD-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Siti Aminah',
            'role' => 'member',
            'phone' => '6287770072170',
            'address' => 'BDB2 AP-38 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Dewi Kustiwi',
            'role' => 'member',
            'phone' => '6281510019190',
            'address' => 'BDB 2 AC-12 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Agus Safrudin',
            'role' => 'member',
            'phone' => '6285218128384',
            'address' => 'BDB2 AC-02 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Rubiakto',
            'role' => 'member',
            'phone' => '628129295583',
            'address' => 'BDB2 AG-06 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Retno Indah Prijanti',
            'role' => 'member',
            'phone' => '6281385251003',
            'address' => 'MUTIARA SENTUL BLOK V NO.9
RT04/10 NANGGEWER',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Muchammad Kurdi',
            'role' => 'member',
            'phone' => '6287867274004',
            'address' => 'BDB2 AL-07 RT003/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Krisna Kurnia Utama Syah',
            'role' => 'member',
            'phone' => '628129419859',
            'address' => 'BDB2 AT-10 RT006/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Djaidin',
            'role' => 'member',
            'phone' => '6285110446789',
            'address' => 'BDB2 AQ-05 RT004/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Faiz Insan Nauli',
            'role' => 'member',
            'phone' => '6288976672428',
            'address' => 'BDB2 AD-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Besrianto L',
            'role' => 'member',
            'phone' => '6281319505299',
            'address' => 'BDB2 AL-04 RT003/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Tarwan',
            'role' => 'member',
            'phone' => '6282114266399',
            'address' => 'BDB2 AT-18 RT006/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Taufik Kesuma Wijaya',
            'role' => 'member',
            'phone' => '6281286209259',
            'address' => 'PERUM GRIYA CITAYAM ASRI BLOK A/8
RT006/005 SUSUKAN',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Titi Sugantri',
            'role' => 'member',
            'phone' => '6281318433965',
            'address' => 'BDB2 AH-01 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Yayah',
            'role' => 'member',
            'phone' => '6288214247171',
            'address' => 'KP CIPEUNDEUY RT002/001
SUKAMULYA CARINGIN',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Adam Iskandar Mabruri',
            'role' => 'member',
            'phone' => '6281213111776',
            'address' => 'BDB2 CD-12 RT008/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Achmad Atje',
            'role' => 'member',
            'phone' => '6281398331266',
            'address' => 'BDB2 CD-12 RT008/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Endang Jamaludin',
            'role' => 'member',
            'phone' => '628997545629',
            'address' => 'CITRA GREEN VIEW
JL. FAMILY MUARA BERES NO.5
RT003/05',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Martina Marcelina Lailena',
            'role' => 'member',
            'phone' => '6281280510445',
            'address' => 'BDB2 CK-46 RT009/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Nyai Maswanih',
            'role' => 'member',
            'phone' => '6288294755657',
            'address' => 'MUARA BERES RT002/001
SUKAHATI',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Fathiyah',
            'role' => 'member',
            'phone' => '6287724023972',
            'address' => 'BDB2 AR-11 RT005/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Syahrul Ramadhan',
            'role' => 'member',
            'phone' => '628121039448',
            'address' => 'BDB2 AW-14 RT009/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Fadlan Ahmad Kamil',
            'role' => 'member',
            'phone' => '6281398304745',
            'address' => 'BDB2 AD-08 RT002/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Wuryanti',
            'role' => 'member',
            'phone' => '6281398015463',
            'address' => 'BDB2 RT005/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Imas Rosyiwiati',
            'role' => 'member',
            'phone' => '6281320113947',
            'address' => 'BDB2 CK-43 RT009/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Ela Nurhayati',
            'role' => 'member',
            'phone' => '6283819943232',
            'address' => 'BDB2 CK-33 RT009/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => "Eni Nur'aeni",
            'role' => 'member',
            'phone' => '6285693773000',
            'address' => 'BDB2 CK-37 RT009/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Moh Ridwan Arifin',
            'role' => 'member',
            'phone' => '6281318254127',
            'address' => 'KP RAWA PANJANG RT001/008
RAWA PANJANG',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Kanti Esti Rahaju',
            'role' => 'member',
            'phone' => '6281210394480', //duplicate
            'address' => 'BDB2 AW-14 RT009/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Wany Widiatie',
            'role' => 'member',
            'phone' => '6287764438524',
            'address' => 'BDB2 BW-02 RT001/015',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Sunjaya',
            'role' => 'member',
            'phone' => '628111161076',
            'address' => 'BDB2 AS-07 RT006/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Deni Iskandar',
            'role' => 'member',
            'phone' => '628159762456',
            'address' => 'BDB2 BJ-09 RT004/015',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Tuti Wahyuningsih Yuda',
            'role' => 'member',
            'phone' => '628999990002',
            'address' => 'BDB2 /CENGKARENG',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Silvya Abdat',
            'role' => 'member',
            'phone' => '6285880100051',
            'address' => 'BDB2 CA-04 RT04/013',
            'city' => 'Kab Bogor',
            'postcode' => '16913',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Bukan Anggota',
            'role' => 'notmember',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'Masjid Al Amin',
            'role' => 'notmember',
            'password' => bcrypt('12345678'),
        ]);
    }
}
