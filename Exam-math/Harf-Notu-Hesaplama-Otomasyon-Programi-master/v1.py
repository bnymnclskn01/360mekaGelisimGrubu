import csv
import matplotlib.pyplot as plt

kullanicilar = []
kullaniciSayisi = 0
readKontrol = 1
hesaplaKontrol = 1
siraliKullanicilar = []
hesapliKullanicilar = []
aa,bb,ba,cb,cc,dc,dd,fd,ff = 0,0,0,0,0,0,0,0,0
class islemler():
    def csvRead(self):
        with open("Sinif.csv") as f:
            okur = csv.reader(f)
            for satir in okur:
                global kullanicilar,kullaniciSayisi
                #print(satir)
                kullanicilar.append(satir)
                kullaniciSayisi += 1
        f.close()
        print("Dosya Okuma İşlemi Başarılı...")
    def csvWrite(self,liste):
        global kullanicilar,kullaniciSayisi
        with open('Sinif.csv', 'a', newline='') as csvFile:
            writer = csv.writer(csvFile)
            writer.writerow(liste)
            kullanicilar.append(liste)
            kullaniciSayisi += 1
           
        csvFile.close()
       

    def personUpdate(self):
        global kullanicilar,kullaniciSayisi
        update = input("Güncellemek İstediğiniz Öğrenci'nin Numarasını Giriniz : ")
        for index, eleman in enumerate(kullanicilar):

            if(eleman[0] == update):
                print(update , " Numaralı Öğrencinin Bilgilerini Yeniden Giriniz.")
                numara = input("Öğrenci No : ")
                ad = input("Ad : ")
                soyad = input("Soyad : ")
                vize1 = input("Vize1 : ")
                vize2 = input("Vize2 : ")
                final = input("Final : ")
                kullanicilar[index] = [numara , ad , soyad , vize1 , vize2 , final]
                print("Kişi Başarıyla Güncellendi.")
                #cikis = 1
                break             
            else:
                if(index  == kullaniciSayisi-1 ):
                    print("Kullanıcı Bulunamadı.")
                    break
                    
    def basariNotlari(self,islem):
        global kullanicilar,kullaniciSayisi,readKontrol,siraliKullanicilar
        global aa,ba,bb,cb,cc,dc,dd,fd,ff
        hesapliKullanicilar.clear()
        siraliKullanicilar.clear()
        for indis,eleman in enumerate(kullanicilar):
            ortalama = round(float(eleman[3])*(0.2) + float(eleman[4])*(0.3) + float(eleman[5])*(0.5))
            durum = ""
            gecmeDurumu = "GEÇTİ"
            if ortalama <=100 and ortalama>=90:
                durum = "AA"
                aa += 1
            elif ortalama <=89 and ortalama>=85:
                durum = "BA"
                ba += 1
            elif ortalama <=84 and ortalama >=80:
                durum = "BB"
                bb += 1
            elif ortalama <=79 and ortalama >=75:
                durum = "CB"
                cb += 1
            elif ortalama <=74 and ortalama >=70:
                durum = "CC"
                cc += 1
            elif ortalama <=69 and ortalama >=65:
                durum = "DC"
                dc += 1
            elif ortalama <=64 and ortalama >=60:
                durum = "DD"
                dd += 1
            elif ortalama <=59 and ortalama >=50:
                durum = "FD"
                gecmeDurumu = "Şartlı Geçti"
                fd += 1
            else:
                durum = "FF"
                gecmeDurumu = "KALDI"
                ff += 1

            hesapliKullanicilar.append([eleman[0] , eleman[1] , eleman[2] , eleman[3] , eleman[4] , eleman[5] , ortalama , durum , gecmeDurumu])
            siraliKullanicilar.append([eleman[0] , eleman[1] , eleman[2] , eleman[3] , eleman[4] , eleman[5] , ortalama , durum , gecmeDurumu])
        if islem == "hesapla":
            for satir in hesapliKullanicilar:
                print(satir)
        elif(islem == "sirala"):
            for i in range(len(siraliKullanicilar)-1):
                for j in range(0,len(siraliKullanicilar)-i-1):
                    if siraliKullanicilar[j][6] < siraliKullanicilar[j+1][6]:
                        siraliKullanicilar[j], siraliKullanicilar[j+1] = siraliKullanicilar[j+1], siraliKullanicilar[j]
            
            for eleman in siraliKullanicilar:
                print(eleman)
        elif(islem == "yazdir"):
            for i in range(len(siraliKullanicilar)-1):
                for j in range(0,len(siraliKullanicilar)-i-1):
                    if siraliKullanicilar[j][6] < siraliKullanicilar[j+1][6]:
                        siraliKullanicilar[j], siraliKullanicilar[j+1] = siraliKullanicilar[j+1], siraliKullanicilar[j]
            with open('Output.csv', 'w', newline='') as csvFile:
                writer = csv.writer(csvFile)
                for eleman in siraliKullanicilar: 
                    writer.writerow(eleman)
            csvFile.close()
            print("Output.csv Dosyası Başarıyla Oluşturuldu.")

    def writeMenu(self):
        global readKontrol,kullaniciSayisi,kullanicilar
        while(True):
            print("1-Dosyadan Oku")
            print("2-Yeni Kayıt Ekle")
            print("3-Kayıt Güncelle")
            print("4-Kayıt Sil")
            print("5-Kayıtları Listele")
            print("6-Sınıf Başarı Notlarını Hesapla")
            print("7-Kayıtları Başarı Notuna Göre Sırala")
            print("8-İstatisiki Bilgiler")
            print("9-Dosyaya Yaz")
            print("10-Çıkış")
            islem = int(input("Lütfen Bir İşlem Seçiniz : "))
            return islem
    def kayitEkle(self):
        global kullanicilar,kullaniciSayisi
        status = 1
        print("Lütfen Kullanıcı Bilgilerini Giriniz : ")
        numara = input("Öğrenci No : ")
        for i in kullanicilar:
            if(numara == i[0]):
                print(numara," Numaralı Öğrenci Sistemde Kayıtlı !")
                status = 0
                break
            else:
                status = 1
                            
        if status:
            ad = input("Ad : ")
            soyad = input("Soyad : ")
            vize1 = input("Vize1 : ")
            vize2 = input("Vize2 : ")
            final = input("Final : ")
            liste = [numara , ad , soyad , vize1 , vize2 , final]
            kullanicilar.append(liste)
            kullaniciSayisi += 1
            print(numara," Numaralı Öğrenci Kayıt Edildi.")
    def kisiyiSil(self):
        global kullanicilar
        global kullaniciSayisi
        delete = input("Bilgilerini Silmek İstediğiniz Öğrenci'nin Numarasını Giriniz : ")
        for indis,eleman in enumerate(kullanicilar):
            if(eleman[0] == delete):
                kullanicilar.pop(indis)
                kullaniciSayisi -= 1
                print(delete," Numaralı Öğrenci'nin Bilgileri Silindi.")
                break
            else:
                if(indis == kullaniciSayisi-1):
                    print(delete," Numaralı Kullanıcı Bulunumadı.")

    def istatistikler(self):
        global hesapliKullanicilar,kullaniciSayisi
        global aa,ba,bb,cb,cc,dc,dd,fd,ff
        kucuk = 100
        buyuk = 0
        toplam = 0
        for i in range(0,kullaniciSayisi):
            toplam += hesapliKullanicilar[i][6]
            if(hesapliKullanicilar[i][6] > buyuk):
                buyuk = hesapliKullanicilar[i][6]
            if(hesapliKullanicilar[i][6] < kucuk):
                kucuk = hesapliKullanicilar[i][6]

        print("En Yüksek Başarı Notu : ", int(buyuk))
        print("En Düşük Başarı Notu : ", int(kucuk))
        
        ortalama = float(toplam)/float(kullaniciSayisi)
        print("Sınıf Ortalaması : ", round(ortalama,2))
        sayac = 0
        toplam = 0

        for i in range(0,kullaniciSayisi):
            toplam = toplam + ((hesapliKullanicilar[i][6] - ortalama)**2)
            if(hesapliKullanicilar[i][6] > ortalama):
                sayac += 1
            
            
        print("Ortalama Üstündeki Kişi Sayısı : ", sayac)
        standartSapma = (float(toplam)/float(kullaniciSayisi))**0.5
        print("Standart Sapma : ",round(standartSapma,2))

        # Harf Notu Grafiği
        x=['AA','BB','BA','CB','CC','DC','DD','FD','FF']
        y=[aa,bb,ba,cb,cc,dc,dd,fd,ff]
        plt.plot(x,y, color = "r")
        plt.plot(x,y, 'or')
        plt.show()
        plt.title("Sınıf Harf Notu Dağılımları")
        plt.xlabel("Harf Notları")
        plt.ylabel("Harf Notu Sayıları")
        #


ost = islemler()

while(True):
    islem = ost.writeMenu()
    
    if islem == 1:
        if readKontrol == 1:
            ost.csvRead()
            readKontrol = 0
        else:
            print("Daha Önce Dosya Okuma İşlemini Gerçekleştirdiniz.")              
    elif islem == 2:
        
        if readKontrol == 0: 
           ost.kayitEkle()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")
    elif islem == 3:
        if readKontrol == 0:
            ost.personUpdate()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")

    elif islem == 4:
        if readKontrol == 0:
           ost.kisiyiSil()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")

    elif islem == 5:
        if readKontrol == 0:
            for satir in kullanicilar:
                print(satir)
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")
    elif islem == 6:
        if readKontrol == 0:
            ost.basariNotlari("hesapla")
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")
    elif islem == 7:
        if readKontrol == 0:
            ost.basariNotlari("sirala")
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")
    elif islem == 8:
        if readKontrol == 0:
            ost.basariNotlari("grafik")
            ost.istatistikler()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")
    elif islem == 9:
        if readKontrol == 0:
            ost.basariNotlari("yazdir")
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştirin.")
    elif islem == 10:
        break

