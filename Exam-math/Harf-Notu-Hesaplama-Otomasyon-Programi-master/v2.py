import pandas as pd
import matplotlib.pyplot as plt

kullanicilar = pd.DataFrame
hesapliKullanicilar = pd.DataFrame
eklenen = 0
aa,bb,ba,cb,cc,dc,dd,fd,ff = 0,0,0,0,0,0,0,0,0
kullaniciSayisi = 0
class proje():

    def menuyuEkranaBas(self):
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
    def dosyadanOkuma(self):
        global kullanicilar,kullaniciSayisi,hesapliKullanicilar
        kullanicilar = pd.read_csv("Sinif.csv", names = ["OgrNo", "Ad", "Soyad", "Vize1", "Vize2", "Final"], encoding="ISO-8859-1")
        hesapliKullanicilar = kullanicilar[:].copy()

        numaraStatus = list(kullanicilar["OgrNo"])
        for i in numaraStatus:
            kullaniciSayisi += 1
        print("Dosya Okuma İşlemi Başarılı !")

    def kayitlariListele(self):
        global kullanicilar
        print(kullanicilar)

    def kayitEkle(self):
        global kullanicilar,kullaniciSayisi,eklenen
        xstr = 1
        print("Lütfen Kullanıcı Bilgilerini Giriniz : ")
        numara = input("Öğrenci No : ")
        i = 0
        while(i != kullaniciSayisi):
            numaraStatus = kullanicilar["OgrNo"][i]
            if int(numaraStatus) == int(numara):
                print(numara," Numaralı Öğrenci Sistemde Kayıtlı !")
                xstr = 0
                break
            i += 1

        if(xstr == 1):
            ad = input("Ad : ")
            soyad = input("Soyad : ")
            vize1 = input("Vize1 : ")
            vize2 = input("Vize2 : ")
            final = input("Final : ")
            liste = {'OgrNo':[numara], 'Ad':[ad], 'Soyad':[soyad], 'Vize1':[vize1], 'Vize2':[vize2], 'Final':[final]}
            yeniSutun = pd.DataFrame(liste)
            kullanicilar = kullanicilar.append(yeniSutun, ignore_index=True)
            print(numara," Numaralı Öğrenci Kayıt Edildi...")
            kullaniciSayisi += 1
            eklenen += 1
    def kayitGuncelle(self):
        global kullanicilar,kullaniciSayisi
        update = input("Güncellemek İstediğiniz Öğrenci'nin Numarasını Giriniz : ")
        i = 0
        while(i != kullaniciSayisi):
            numaraStatus = kullanicilar["OgrNo"][i]
            if int(numaraStatus) == int(update):
                numara = input("Öğrenci No : ")
                ad = input("Ad : ")
                soyad = input("Soyad : ")
                vize1 = input("Vize1 : ")
                vize2 = input("Vize2 : ")
                final = input("Final : ")
                satir = kullanicilar.loc[lambda df: kullanicilar['OgrNo'] == int(update) ]
                satirindex = satir.index
                kullanicilar.loc[satirindex, 'OgrNo'] = numara
                kullanicilar.loc[satirindex, 'Ad'] = ad
                kullanicilar.loc[satirindex, 'Soyad'] = soyad
                kullanicilar.loc[satirindex, 'Vize1'] = vize1
                kullanicilar.loc[satirindex, 'Vize2'] = vize2
                kullanicilar.loc[satirindex, 'Final'] = final
                print("Kişi Başarıyla Güncellendi...")
                break
            else :
                if(i == kullaniciSayisi - 1):
                    print(update, " Numaralı Kullanıcı Bulunamadı...")
                    break
            i += 1
    def kayitSil(self):
        global kullanicilar,kullaniciSayisi
        delete = int(input("Bilgilerini Silmek İstediğiniz Öğrenci'nin Numarasını Giriniz : "))
        i = 0
        while(i != kullaniciSayisi):
            numaraStatus = kullanicilar["OgrNo"][i]
            if int(numaraStatus) == int(delete):
                satir = kullanicilar.loc[lambda df: kullanicilar['OgrNo'] == int(delete) ]
                satirindex = satir.index
                kullanicilar = kullanicilar.drop(satirindex)
                print(delete," Numaralı Öğrenci'nin Bilgileri Silindi...")
                kullaniciSayisi -= 1
                break
            else:
                if(i == kullaniciSayisi - 1):
                    print(delete," Numaralı Kullanıcı Bulunamadı...")
                    break
            i += 1
        
    def basariNotlariniHesapla(self,islem):
        global hesapliKullanicilar,kullaniciSayisi,kullanicilar,eklenen
        global aa,ba,bb,cb,cc,dc,dd,fd,ff
        for i in range(0,kullaniciSayisi):
            vize1 = kullanicilar["Vize1"][i]
            vize2 = kullanicilar["Vize2"][i]
            final = kullanicilar["Final"][i]
            ortalama = round(float(vize1)*(0.2) + float(vize2)*(0.3) + float(final)*(0.5))
            durum = ""
            gecmeDurumu = "GECTI"
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
                gecmeDurumu = "Sartli Gecti"
                fd += 1
            else:
                durum = "FF"
                gecmeDurumu = "KALDI"
                ff += 1

            if((i + eklenen) >= (kullaniciSayisi -1)):
                hesapliKullanicilar.loc[i, 'OgrNo'] = kullanicilar['OgrNo'][i]
                hesapliKullanicilar.loc[i, 'Ad'] = kullanicilar['Ad'][i]
                hesapliKullanicilar.loc[i, 'Soyad'] = kullanicilar['Soyad'][i]
                hesapliKullanicilar.loc[i, 'Vize1'] = kullanicilar['Vize1'][i]
                hesapliKullanicilar.loc[i, 'Vize2'] = kullanicilar['Vize2'][i]
                hesapliKullanicilar.loc[i, 'Final'] = kullanicilar['Final'][i]
            else:

                hesapliKullanicilar['OgrNo'] = kullanicilar['OgrNo']
                hesapliKullanicilar['Ad'] = kullanicilar['Ad']
                hesapliKullanicilar['Soyad'] = kullanicilar['Soyad']
                hesapliKullanicilar['Vize1'] = kullanicilar['Vize1']
                hesapliKullanicilar['Vize2'] = kullanicilar['Vize2']
                hesapliKullanicilar['Final'] = kullanicilar['Final']
            
            hesapliKullanicilar.loc[i, 'Ortalama'] = float(ortalama)
            hesapliKullanicilar.loc[i, 'Durum'] = durum
            hesapliKullanicilar.loc[i, 'Gecme Durumu'] = gecmeDurumu

        if(islem == "hesapla"):
            print(hesapliKullanicilar)
        elif(islem == "sirala"):
            print(hesapliKullanicilar.sort_values(['Ortalama'], ascending = False))
        elif(islem == "olustur"):
            hesapliKullanicilar.sort_values(['Ortalama'], ascending = False).to_csv('Output.csv',index=False)
            print("Output.csv Dosyası Başarıyla Oluşturuldu !")
            
    def istatistikler(self):
        global hesapliKullanicilar,kullaniciSayisi
        print("En Yüksek Başarı Notu : ", int(max(hesapliKullanicilar['Ortalama'])))
        print("En Düşük Başarı Notu : ", int(min(hesapliKullanicilar['Ortalama'])))
        toplam = 0
        for i in range(0,kullaniciSayisi):
            toplam += hesapliKullanicilar['Ortalama'][i]
        
        ortalama = float(toplam)/float(kullaniciSayisi)
        print("Sınıf Ortalaması : ", round(ortalama,2))
        sayac = 0
        for i in range(0,kullaniciSayisi):
            toplam += (hesapliKullanicilar['Ortalama'][i] - ortalama)**2
            if(hesapliKullanicilar['Ortalama'][i] > ortalama):
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



p = proje()
readKontrol = 1


while(True):
    islem = p.menuyuEkranaBas()

    if(islem == 1):
        if readKontrol == 1:
            p.dosyadanOkuma()
            readKontrol = 0
        else:
            print("Daha Önce Dosya Okuma İşlemini Gerçekleştirdiniz.")
    if(islem == 2):
        if(readKontrol == 0):
            p.kayitEkle()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 3):
        if(readKontrol == 0):
            p.kayitGuncelle()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 4):
        if(readKontrol == 0):
            p.kayitSil()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 5):
        if(readKontrol == 0):
            p.kayitlariListele()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 6):
        if(readKontrol == 0):
            p.basariNotlariniHesapla("hesapla")
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 7):
        if(readKontrol == 0):
            p.basariNotlariniHesapla("sirala")
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 8):
        if(readKontrol == 0):
            p.basariNotlariniHesapla("grafik")
            p.istatistikler()
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 9):
        if(readKontrol == 0):
            p.basariNotlariniHesapla("olustur")
        else:
            print("Lütfen Önce Dosya Okuma İşlemini Gerçekleştiriniz...")
    if(islem == 10):
        break
