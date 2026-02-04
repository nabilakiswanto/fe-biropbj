import {
  getStrapiLatestNews,
  getStrapiAllNews,
  getStrapiNewsDetail,
  getStrapiLatestInfographics,
  getStrapiAllInfographics,
  getStrapiInfographicDetail,
  getStrapiPejabatList,
  getStrapiContactInfo,
  getStrapiDocuments,
  getStrapiPostsByCategory,
  getStrapiHomePage,
  getStrapiGlobal
} from "./api"

// Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  imageUrl: string
  category?: string
  dynamicComponents?: any[]
}

export interface Pejabat {
  id: string
  name: string
  position: string
  nip: string
  education: string
  email: string
  imageUrl: string
}
export interface Block {
  __component: string
  [key: string]: any
}

export interface ListApp {
  id: number
  name: string
  description?: string
  url?: string
  image?: any
  icon?: any
}

export interface Home {
  id: number
  documentId: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  blocks: Block[]
  ListApps?: {
    id: number
    list_app?: ListApp[]
  }
  apiSource?: string
}


export interface Global{
  id: number
  documentId: string
  title: string
  description: string
  namaOPD: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  header:Block[]
  footer:Block[]
}

export interface Document {
  id: string
  title: string
  description: string
  category: "peraturan" | "laporan" | "pedoman"
  date: string
  fileUrl: string
}

export interface ContactInfo {
  judul:string
  address: string
  phone: string
  googleMapsUrl?: string
}

// Flag to toggle between mock data and API data
// Set to false to use mock data, true to use API data
const USE_API = true

// Mock data for news
const newsData: BlogPost[] = [
  {
    id: "1",
    title: "Pembukaan Pekan Olahraga Provinsi Sulawesi Utara 2025",
    slug: "pembukaan-pekan-olahraga-provinsi-sulawesi-utara-2025",
    excerpt:
      "Gubernur Sulawesi Utara secara resmi membuka Pekan Olahraga Provinsi (Porprov) 2025 di Stadion Klabat, Manado.",
    content: `
      <p>Gubernur Sulawesi Utara secara resmi membuka Pekan Olahraga Provinsi (Porprov) 2025 di Stadion Klabat, Manado pada Senin (10/3/2025). Acara pembukaan dihadiri oleh seluruh kontingen dari 15 kabupaten/kota se-Sulawesi Utara.</p>
      <p>Dalam sambutannya, Gubernur menekankan pentingnya sportivitas dan persaudaraan dalam kompetisi. "Porprov bukan hanya ajang untuk meraih medali, tetapi juga untuk mempererat tali persaudaraan antar daerah di Sulawesi Utara," ujarnya.</p>
      <p>Porprov 2025 akan mempertandingkan 26 cabang olahraga dan akan berlangsung selama 10 hari. Sebanyak 3.500 atlet dan official dari seluruh kabupaten/kota di Sulawesi Utara berpartisipasi dalam event olahraga terbesar di tingkat provinsi ini.</p>
      <p>Kepala Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara mengatakan bahwa persiapan penyelenggaraan Porprov 2025 telah dilakukan sejak satu tahun lalu. "Kami telah mempersiapkan segala sesuatunya dengan baik, mulai dari venue pertandingan, akomodasi, hingga transportasi para atlet dan official," katanya.</p>
      <p>Porprov 2025 juga akan menjadi ajang seleksi atlet untuk mewakili Sulawesi Utara di Pekan Olahraga Nasional (PON) yang akan diselenggarakan pada tahun 2026.</p>
    `,
    date: "2025-03-10",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Atlet Muda Sulawesi Utara Raih Medali Emas di Kejuaraan Nasional",
    slug: "atlet-muda-sulawesi-utara-raih-medali-emas-di-kejuaraan-nasional",
    excerpt:
      "Tiga atlet muda Sulawesi Utara berhasil meraih medali emas pada Kejuaraan Nasional Atletik U-18 di Jakarta.",
    content: `
      <p>Tiga atlet muda Sulawesi Utara berhasil meraih medali emas pada Kejuaraan Nasional Atletik U-18 yang diselenggarakan di Jakarta pada 15-20 Februari 2025. Ketiga atlet tersebut adalah Maria Lontoh (lari 100m putri), James Sumampouw (lompat jauh putra), dan Cindy Wenas (lempar lembing putri).</p>
      <p>Maria Lontoh berhasil mencatatkan waktu 11,85 detik pada final lari 100m putri, mengalahkan atlet-atlet dari DKI Jakarta dan Jawa Barat. James Sumampouw meraih medali emas dengan lompatan sejauh 7,65 meter, sementara Cindy Wenas melempar lembing sejauh 48,75 meter.</p>
      <p>Kepala Bidang Pembinaan Prestasi Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara menyatakan bahwa prestasi ini merupakan hasil dari program pembinaan atlet muda yang telah dijalankan selama tiga tahun terakhir. "Kami fokus pada pembinaan atlet usia muda karena mereka adalah masa depan olahraga Sulawesi Utara," ujarnya.</p>
      <p>Ketiga atlet tersebut akan mendapatkan bonus dari Pemerintah Provinsi Sulawesi Utara sebagai bentuk apresiasi atas prestasi yang telah mereka raih. Selain itu, mereka juga akan dipersiapkan untuk mengikuti kejuaraan internasional pada tahun depan.</p>
    `,
    date: "2025-02-22",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Dinas Pemuda dan Olahraga Gelar Pelatihan Kewirausahaan bagi Pemuda",
    slug: "dinas-pemuda-dan-olahraga-gelar-pelatihan-kewirausahaan-bagi-pemuda",
    excerpt:
      "Sebanyak 100 pemuda dari berbagai daerah di Sulawesi Utara mengikuti pelatihan kewirausahaan yang diselenggarakan oleh Dinas Pemuda dan Olahraga.",
    content: `
      <p>Sebanyak 100 pemuda dari berbagai daerah di Sulawesi Utara mengikuti pelatihan kewirausahaan yang diselenggarakan oleh Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara pada 5-7 Januari 2025 di Manado.</p>
      <p>Pelatihan ini bertujuan untuk meningkatkan jiwa kewirausahaan dan keterampilan bisnis para pemuda agar mampu menciptakan lapangan kerja dan berkontribusi pada perekonomian daerah. Materi pelatihan meliputi identifikasi peluang usaha, penyusunan rencana bisnis, pemasaran digital, dan manajemen keuangan.</p>
      <p>Kepala Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara dalam sambutannya menyampaikan bahwa program ini merupakan bagian dari upaya pemerintah untuk mengurangi pengangguran di kalangan pemuda. "Kami ingin para pemuda tidak hanya mencari kerja, tetapi juga mampu menciptakan lapangan kerja," ujarnya.</p>
      <p>Selain mendapatkan materi, peserta juga berkesempatan untuk melakukan kunjungan ke beberapa UMKM sukses di Manado sebagai bentuk studi banding. Di akhir pelatihan, peserta akan mempresentasikan rencana bisnis mereka dan 10 rencana bisnis terbaik akan mendapatkan pendampingan dan bantuan modal dari Pemerintah Provinsi Sulawesi Utara.</p>
    `,
    date: "2025-01-08",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    title: "Renovasi Stadion Klabat Rampung, Siap Gelar Pertandingan Internasional",
    slug: "renovasi-stadion-klabat-rampung-siap-gelar-pertandingan-internasional",
    excerpt:
      "Setelah menjalani renovasi selama satu tahun, Stadion Klabat kini siap menjadi venue pertandingan sepak bola internasional.",
    content: `
      <p>Setelah menjalani renovasi selama satu tahun, Stadion Klabat di Manado kini siap menjadi venue pertandingan sepak bola internasional. Renovasi dengan anggaran Rp 150 miliar ini mencakup peningkatan kapasitas stadion menjadi 35.000 penonton, perbaikan rumput lapangan, pemasangan lampu dengan standar FIFA, dan pembaruan fasilitas pendukung lainnya.</p>
      <p>Gubernur Sulawesi Utara mengatakan bahwa renovasi Stadion Klabat merupakan investasi jangka panjang untuk pengembangan olahraga di Sulawesi Utara. "Dengan fasilitas yang memenuhi standar internasional, kita berharap Stadion Klabat dapat menjadi tuan rumah berbagai event olahraga nasional dan internasional," ujarnya saat meresmikan hasil renovasi stadion pada Jumat (15/11/2024).</p>
      <p>Kepala Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara menambahkan bahwa pihaknya telah mengajukan proposal kepada PSSI untuk menggelar pertandingan internasional Timnas Indonesia di Stadion Klabat pada awal tahun 2025. "Kami optimis proposal ini akan disetujui mengingat Stadion Klabat kini telah memenuhi semua persyaratan untuk menggelar pertandingan internasional," katanya.</p>
      <p>Selain untuk pertandingan sepak bola, Stadion Klabat juga dilengkapi dengan lintasan atletik berstandar internasional yang dapat digunakan untuk kejuaraan atletik tingkat nasional dan internasional.</p>
    `,
    date: "2024-11-16",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "5",
    title: "Program Beasiswa Atlet Berprestasi Diluncurkan",
    slug: "program-beasiswa-atlet-berprestasi-diluncurkan",
    excerpt: "Pemerintah Provinsi Sulawesi Utara meluncurkan program beasiswa pendidikan bagi atlet berprestasi.",
    content: `
      <p>Pemerintah Provinsi Sulawesi Utara melalui Dinas Pemuda dan Olahraga meluncurkan program beasiswa pendidikan bagi atlet berprestasi. Program yang diluncurkan pada Senin (7/10/2024) ini akan memberikan beasiswa pendidikan mulai dari tingkat SMP hingga perguruan tinggi bagi atlet yang telah mengharumkan nama Sulawesi Utara di tingkat nasional dan internasional.</p>
      <p>Gubernur Sulawesi Utara dalam sambutannya menyatakan bahwa program ini merupakan bentuk apresiasi pemerintah terhadap prestasi para atlet. "Kami ingin memastikan bahwa para atlet tidak hanya berprestasi di bidang olahraga, tetapi juga memiliki masa depan yang cerah melalui pendidikan yang baik," ujarnya.</p>
      <p>Program beasiswa ini akan mencakup biaya pendidikan, biaya hidup, dan tunjangan prestasi. Untuk tahun 2025, pemerintah provinsi telah mengalokasikan anggaran sebesar Rp 5 miliar untuk program ini dan akan diberikan kepada 100 atlet berprestasi dari berbagai cabang olahraga.</p>
      <p>Kepala Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara menjelaskan bahwa seleksi penerima beasiswa akan dilakukan secara transparan dengan mempertimbangkan prestasi atlet dan latar belakang ekonomi keluarga. "Kami akan memprioritaskan atlet berprestasi yang berasal dari keluarga kurang mampu," katanya.</p>
    `,
    date: "2024-10-08",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "6",
    title: "Sulawesi Utara Tuan Rumah Kejuaraan Renang Antar Pelajar Se-Indonesia Timur",
    slug: "sulawesi-utara-tuan-rumah-kejuaraan-renang-antar-pelajar-se-indonesia-timur",
    excerpt:
      "Sulawesi Utara dipercaya menjadi tuan rumah Kejuaraan Renang Antar Pelajar Se-Indonesia Timur yang akan digelar pada bulan Mei 2025.",
    content: `
      <p>Sulawesi Utara dipercaya menjadi tuan rumah Kejuaraan Renang Antar Pelajar Se-Indonesia Timur yang akan digelar pada bulan Mei 2025. Kejuaraan ini akan diikuti oleh pelajar dari 12 provinsi di Indonesia Timur, mulai dari tingkat SD hingga SMA.</p>
      <p>Kepala Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara menyatakan bahwa kepercayaan sebagai tuan rumah merupakan pengakuan atas kemampuan Sulawesi Utara dalam menyelenggarakan event olahraga berskala besar. "Kami berkomitmen untuk menyelenggarakan kejuaraan ini dengan sebaik-baiknya," ujarnya dalam konferensi pers pada Rabu (25/9/2024).</p>
      <p>Kejuaraan akan digelar di Kolam Renang Olimpiade yang baru saja selesai dibangun di kompleks olahraga Manado. Kolam renang ini memiliki 10 lintasan dan dilengkapi dengan fasilitas berstandar internasional, termasuk sistem penilaian elektronik dan tribun berkapasitas 2.000 penonton.</p>
      <p>Ketua Panitia Pelaksana mengatakan bahwa persiapan penyelenggaraan kejuaraan telah dimulai sejak awal September 2024. "Kami telah membentuk panitia dan mulai melakukan koordinasi dengan berbagai pihak terkait, termasuk akomodasi dan transportasi bagi peserta," katanya.</p>
      <p>Kejuaraan Renang Antar Pelajar Se-Indonesia Timur diharapkan dapat menjadi ajang pencarian bibit atlet renang berbakat yang nantinya akan dibina untuk mewakili Indonesia di kejuaraan internasional.</p>
    `,
    date: "2024-09-26",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

// Mock data for infographics
const infographicsData: BlogPost[] = [
  {
    id: "1",
    title: "Perkembangan Prestasi Olahraga Sulawesi Utara 2020-2025",
    slug: "perkembangan-prestasi-olahraga-sulawesi-utara-2020-2025",
    excerpt: "Infografis mengenai perkembangan prestasi olahraga Sulawesi Utara dalam kurun waktu 5 tahun terakhir.",
    content: `
      <p>Infografis ini menampilkan perkembangan prestasi olahraga Sulawesi Utara dalam kurun waktu 5 tahun terakhir (2020-2025). Data menunjukkan peningkatan signifikan dalam perolehan medali di berbagai kejuaraan nasional dan internasional.</p>
      <p>Beberapa highlight dari infografis ini:</p>
      <ul>
        <li>Peningkatan jumlah medali emas di PON dari 5 medali (2020) menjadi 12 medali (2024)</li>
        <li>Peningkatan jumlah atlet Sulawesi Utara yang masuk dalam pelatnas dari 8 orang (2020) menjadi 23 orang (2025)</li>
        <li>Cabang olahraga unggulan Sulawesi Utara: renang, atletik, dan tinju</li>
        <li>Distribusi atlet berdasarkan kabupaten/kota di Sulawesi Utara</li>
      </ul>
      <p>Infografis ini juga menampilkan faktor-faktor yang berkontribusi pada peningkatan prestasi, seperti peningkatan anggaran pembinaan atlet, pembangunan fasilitas olahraga, dan program pelatihan yang berkelanjutan.</p>
    `,
    date: "2025-02-15",
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "2",
    title: "Profil Pemuda Sulawesi Utara 2025",
    slug: "profil-pemuda-sulawesi-utara-2025",
    excerpt: "Infografis mengenai profil dan potensi pemuda Sulawesi Utara berdasarkan data tahun 2025.",
    content: `
      <p>Infografis ini menyajikan data komprehensif mengenai profil dan potensi pemuda Sulawesi Utara berdasarkan data tahun 2025. Infografis ini mencakup berbagai aspek seperti demografi, pendidikan, ketenagakerjaan, dan partisipasi pemuda dalam berbagai bidang.</p>
      <p>Beberapa data penting yang ditampilkan dalam infografis ini:</p>
      <ul>
        <li>Jumlah pemuda (usia 16-30 tahun) di Sulawesi Utara: 750.000 jiwa (25% dari total penduduk)</li>
        <li>Tingkat pendidikan pemuda: 45% lulusan SMA, 30% lulusan perguruan tinggi, 25% lulusan SMP ke bawah</li>
        <li>Tingkat pengangguran pemuda: 15% (menurun dari 20% pada tahun 2020)</li>
        <li>Jumlah wirausaha muda: 25.000 orang (meningkat 30% dari tahun 2020)</li>
        <li>Partisipasi pemuda dalam organisasi kepemudaan: 35%</li>
      </ul>
      <p>Infografis ini juga menampilkan berbagai program pemberdayaan pemuda yang telah dilaksanakan oleh Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara, serta dampaknya terhadap peningkatan kualitas pemuda di provinsi ini.</p>
    `,
    date: "2025-01-20",
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "3",
    title: "Peta Fasilitas Olahraga di Sulawesi Utara",
    slug: "peta-fasilitas-olahraga-di-sulawesi-utara",
    excerpt:
      "Infografis mengenai persebaran dan kondisi fasilitas olahraga di seluruh kabupaten/kota di Sulawesi Utara.",
    content: `
      <p>Infografis ini menampilkan peta persebaran dan kondisi fasilitas olahraga di seluruh kabupaten/kota di Sulawesi Utara. Data yang disajikan merupakan hasil pendataan yang dilakukan oleh Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara pada tahun 2024.</p>
      <p>Beberapa informasi yang dapat dilihat dalam infografis ini:</p>
      <ul>
        <li>Jumlah total fasilitas olahraga di Sulawesi Utara: 450 fasilitas</li>
        <li>Persebaran fasilitas berdasarkan kabupaten/kota</li>
        <li>Jenis fasilitas olahraga: stadion, gelanggang olahraga, kolam renang, lapangan tenis, dll.</li>
        <li>Kondisi fasilitas: baik (60%), cukup baik (25%), kurang baik (15%)</li>
        <li>Fasilitas yang baru dibangun dalam 5 tahun terakhir</li>
      </ul>
      <p>Infografis ini juga menampilkan rencana pembangunan dan renovasi fasilitas olahraga untuk periode 2025-2030, termasuk anggaran yang dialokasikan untuk masing-masing proyek.</p>
    `,
    date: "2024-12-10",
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "4",
    title: "Anggaran Pembinaan Olahraga Sulawesi Utara 2025",
    slug: "anggaran-pembinaan-olahraga-sulawesi-utara-2025",
    excerpt: "Infografis mengenai alokasi anggaran untuk pembinaan olahraga di Sulawesi Utara pada tahun 2025.",
    content: `
      <p>Infografis ini menyajikan data mengenai alokasi anggaran untuk pembinaan olahraga di Sulawesi Utara pada tahun 2025. Anggaran ini berasal dari APBD Provinsi Sulawesi Utara dan dialokasikan untuk berbagai program pembinaan olahraga.</p>
      <p>Beberapa informasi yang ditampilkan dalam infografis ini:</p>
      <ul>
        <li>Total anggaran pembinaan olahraga: Rp 100 miliar (meningkat 25% dari tahun 2024)</li>
        <li>Alokasi anggaran berdasarkan cabang olahraga</li>
        <li>Alokasi anggaran berdasarkan jenis program: pembinaan atlet junior (30%), pembinaan atlet senior (40%), pengembangan fasilitas (20%), kompetisi (10%)</li>
        <li>Perbandingan anggaran pembinaan olahraga Sulawesi Utara dengan provinsi lain di Indonesia</li>
      </ul>
      <p>Infografis ini juga menampilkan korelasi antara peningkatan anggaran pembinaan olahraga dengan peningkatan prestasi atlet Sulawesi Utara dalam 5 tahun terakhir.</p>
    `,
    date: "2024-11-05",
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "5",
    title: "Program Unggulan Dinas Pemuda dan Olahraga Sulawesi Utara 2025",
    slug: "program-unggulan-dinas-pemuda-dan-olahraga-sulawesi-utara-2025",
    excerpt:
      "Infografis mengenai program-program unggulan Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara pada tahun 2025.",
    content: `
      <p>Infografis ini menampilkan program-program unggulan Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara yang akan dilaksanakan pada tahun 2025. Program-program ini dirancang untuk meningkatkan kualitas pemuda dan prestasi olahraga di Sulawesi Utara.</p>
      <p>Beberapa program unggulan yang ditampilkan dalam infografis ini:</p>
      <ul>
        <li>Sulawesi Utara Berprestasi: program pembinaan atlet berbakat dari usia dini</li>
        <li>Wirausaha Muda Sulut: program pelatihan dan pendampingan wirausaha bagi pemuda</li>
        <li>Beasiswa Atlet Berprestasi: program beasiswa pendidikan bagi atlet yang telah mengharumkan nama Sulawesi Utara</li>
        <li>Desa Olahraga: program pengembangan fasilitas olahraga di desa-desa</li>
        <li>Pemuda Pelopor: program penghargaan bagi pemuda yang berprestasi di berbagai bidang</li>
      </ul>
      <p>Infografis ini juga menampilkan target dan indikator keberhasilan untuk masing-masing program, serta anggaran yang dialokasikan.</p>
    `,
    date: "2024-10-15",
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "6",
    title: "Perbandingan Prestasi Olahraga Antar Provinsi di Sulawesi",
    slug: "perbandingan-prestasi-olahraga-antar-provinsi-di-sulawesi",
    excerpt:
      "Infografis mengenai perbandingan prestasi olahraga antar provinsi di Pulau Sulawesi dalam 5 tahun terakhir.",
    content: `
      <p>Infografis ini menyajikan perbandingan prestasi olahraga antar provinsi di Pulau Sulawesi (Sulawesi Utara, Sulawesi Tengah, Sulawesi Selatan, Sulawesi Tenggara, Gorontalo, dan Sulawesi Barat) dalam 5 tahun terakhir (2020-2025).</p>
      <p>Beberapa informasi yang ditampilkan dalam infografis ini:</p>
      <ul>
        <li>Perolehan medali masing-masing provinsi di PON 2024</li>
        <li>Jumlah atlet nasional dari masing-masing provinsi</li>
        <li>Cabang olahraga unggulan masing-masing provinsi</li>
        <li>Anggaran pembinaan olahraga masing-masing provinsi</li>
        <li>Fasilitas olahraga yang dimiliki masing-masing provinsi</li>
      </ul>
      <p>Infografis ini menunjukkan bahwa Sulawesi Utara berada di posisi kedua dalam hal prestasi olahraga di Pulau Sulawesi, di bawah Sulawesi Selatan namun di atas provinsi-provinsi lainnya. Sulawesi Utara unggul dalam cabang olahraga renang, atletik, dan tinju.</p>
    `,
    date: "2024-09-20",
    imageUrl: "/placeholder.svg?height=800&width=600",
  },
]

// Mock data for pejabat
const pejabatData: Pejabat[] = [
  {
    id: "1",
    name: "Dr. Nama Kepala Dinas",
    position: "Kepala Dinas",
    nip: "19700101 199803 1 001",
    education: "S3 Manajemen Olahraga",
    email: "kepaladinas@disporasulut.go.id",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Nama Sekretaris",
    position: "Sekretaris",
    nip: "19750215 200012 1 002",
    education: "S2 Administrasi Publik",
    email: "sekretaris@disporasulut.go.id",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Nama Wakil Kepala Dinas",
    position: "Wakil Kepala Dinas",
    nip: "19800320 200501 1 003",
    education: "S2 Manajemen",
    email: "wakadinss@disporasulut.go.id",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Nama Kepala Bidang Pemuda",
    position: "Kepala Bidang Pemuda",
    nip: "19820405 200601 1 004",
    education: "S2 Pendidikan",
    email: "kabidpemuda@disporasulut.go.id",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Nama Kepala Bidang Olahraga",
    position: "Kepala Bidang Olahraga",
    nip: "19850510 200701 1 005",
    education: "S2 Ilmu Keolahragaan",
    email: "kabidolahraga@disporasulut.go.id",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Nama Kepala Bidang Standarisasi dan Infrastruktur",
    position: "Kepala Bidang Standarisasi dan Infrastruktur",
    nip: "19880615 201001 1 006",
    education: "S2 Teknik Sipil",
    email: "kabidstandar@disporasulut.go.id",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

// Mock data for documents
const documentData: Document[] = [
  {
    id: "1",
    title: "Peraturan Daerah Provinsi Sulawesi Utara Nomor 4 Tahun 2023 tentang Pembinaan dan Pengembangan Olahraga",
    description:
      "Peraturan daerah yang mengatur tentang pembinaan dan pengembangan olahraga di Provinsi Sulawesi Utara.",
    category: "peraturan",
    date: "2023-05-15",
    fileUrl: "#",
  },
  {
    id: "2",
    title:
      "Peraturan Gubernur Sulawesi Utara Nomor 12 Tahun 2024 tentang Tata Cara Pemberian Penghargaan bagi Atlet Berprestasi",
    description:
      "Peraturan gubernur yang mengatur tentang tata cara pemberian penghargaan bagi atlet yang berprestasi di tingkat nasional dan internasional.",
    category: "peraturan",
    date: "2024-02-20",
    fileUrl: "#",
  },
  {
    id: "3",
    title: "Laporan Kinerja Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara Tahun 2024",
    description: "Laporan kinerja Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara selama tahun 2024.",
    category: "laporan",
    date: "2025-01-15",
    fileUrl: "#",
  },
  {
    id: "4",
    title: "Laporan Pelaksanaan Pekan Olahraga Provinsi (Porprov) Sulawesi Utara 2024",
    description:
      "Laporan pelaksanaan Pekan Olahraga Provinsi (Porprov) Sulawesi Utara yang diselenggarakan pada tahun 2024.",
    category: "laporan",
    date: "2024-12-10",
    fileUrl: "#",
  },
  {
    id: "5",
    title: "Pedoman Pembinaan Atlet Berbakat di Provinsi Sulawesi Utara",
    description: "Pedoman yang berisi tentang tata cara pembinaan atlet berbakat di Provinsi Sulawesi Utara.",
    category: "pedoman",
    date: "2024-06-05",
    fileUrl: "#",
  },
  {
    id: "6",
    title: "Pedoman Penyelenggaraan Kompetisi Olahraga Tingkat Provinsi",
    description: "Pedoman yang berisi tentang tata cara penyelenggaraan kompetisi olahraga di tingkat provinsi.",
    category: "pedoman",
    date: "2024-08-20",
    fileUrl: "#",
  },
]

// Functions to get data - using either mock data or API calls based on USE_API flag

// Get latest news
export async function getLatestNews(limit = 3): Promise<BlogPost[]> {
  if (USE_API) {
    try {
      return await getStrapiLatestNews(limit)
    } catch (error) {
      console.error("Error fetching latest news:", error)
      return []
    }
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    return newsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
  }
}

// Get latest infographics
export async function getLatestInfographics(limit = 3): Promise<BlogPost[]> {
  if (USE_API) {
    try {
      return await getStrapiLatestInfographics(limit)
    } catch (error) {
      console.error("Error fetching latest infographics:", error)
      return []
    }
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    return infographicsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
  }
}

// Get all news
export async function getAllNews(): Promise<BlogPost[]> {
  if (USE_API) {
    try {
      return await getStrapiAllNews()
    } catch (error) {
      console.error("Error fetching all news:", error)
      return []
    }
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    return newsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
}

// Get all infographics
export async function getAllInfographics(): Promise<BlogPost[]> {
  if (USE_API) {
    try {
      return await getStrapiAllInfographics()
    } catch (error) {
      console.error("Error fetching all infographics:", error)
      return []
    }
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    return infographicsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
}

// Get news detail by slug
export async function getNewsDetail(slug: string): Promise<BlogPost> {
  if (USE_API) {
    return await getStrapiNewsDetail(slug)
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    const news = newsData.find((item) => item.slug === slug)
    if (!news) {
      throw new Error(`News with slug "${slug}" not found`)
    }
    return news
  }
}

// Get infographic detail by slug
export async function getInfographicDetail(slug: string): Promise<BlogPost> {
  if (USE_API) {
    return await getStrapiInfographicDetail(slug)
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    const infographic = infographicsData.find((item) => item.slug === slug)
    if (!infographic) {
      throw new Error(`Infographic with slug "${slug}" not found`)
    }
    return infographic
  }
}



// Get contact info
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const info = await getStrapiContactInfo()

    if (!info) {
      throw new Error("No contact info returned from Strapi.")
    }

    return info
  } catch (error) {
    console.error("Error fetching contact info from Strapi:", error)
    throw error // or handle it based on your use case
  }
}

// Get documents
export async function getDocuments(): Promise<Document[]> {
  if (USE_API) {
    try {
      return await getStrapiDocuments()
    } catch (error) {
      console.error("Error fetching documents:", error)
      return documentData
    }
  } else {
    // Use mock data
    await new Promise((resolve) => setTimeout(resolve, 100))
    return documentData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
}

// Add this new function to get posts by category
export async function getPostsByCategory(category: string, limit?: number): Promise<BlogPost[]> {
  if (USE_API) {
    try {
      return await getStrapiPostsByCategory(category, limit)
    } catch (error) {
      console.error(`Error fetching posts with category ${category}:`, error)
      return []
    }
  } else {
    // Use mock data - for berita category, return news data
    await new Promise((resolve) => setTimeout(resolve, 100))

    let posts: BlogPost[] = []
    if (category === "berita") {
      posts = newsData
    } else if (category === "infografis") {
      posts = infographicsData
    }

    // Sort by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Apply limit if provided
    return limit ? sortedPosts.slice(0, limit) : sortedPosts
  }
}
// Get homepage
export async function getHomePage(): Promise<Home> {
  const fallback: Home = {
    id: 0,
    documentId: '',
    title: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    blocks: []
  }

  if (USE_API) {
    try {
      const res = await getStrapiHomePage()
      return res ?? fallback
    } catch (error) {
      console.error("Error fetching homepage:", error)
      return fallback
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return fallback
  }
}
// Get global (header & footer)
export async function getGlobalPage(): Promise<Global> {
  const fallback: Global = {
    id: 0,
    documentId: '',
    title: '',
    description: '',
    namaOPD:'',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    header: [],
    footer: []
  }

  if (USE_API) {
    try {
      const res = await getStrapiGlobal()
      return res ?? fallback
    } catch (error) {
      console.error("Error fetching global:", error)
      return fallback
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return fallback
  }
}


