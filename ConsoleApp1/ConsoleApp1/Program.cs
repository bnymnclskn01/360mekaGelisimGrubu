using System;

namespace ConsoleApp1
{
    public class Program
    {
        static void Main(string[] args)
        {
            #region Değişkenler
            /*
            Tam sayı ile ilgili bir girdi çıktılarla uğraşacaksak int değişkenini kullancaz
            Yazı yazmak için ve bunların girdi ve çıktıları içinde string
            Karekter bazlı çalışmalar içinde char
            Virgüllü Sayılarla yani ondalıklı sayılarla çalışmak içinde double ve float kullanılır.
            Para birimi ile çalışmalar yapıalcaksa decimal kullanılır.
            Doğru Yanlış Yanlış Doğru işlemleri için bool kullanılır içindeki değer ise
            True False
            */
            #endregion
            #region Değişken Örnekleri
            string Ediz= "Ediz Buse'yi seviyor.";
            int Sayi1, Sayi2,toplam;
            Console.WriteLine("Lütfen bir sayı giriniz");
            Sayi1 = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Lütfen bir diğer sayıyı giriniz");
            Sayi2 = Convert.ToInt32(Console.ReadLine());
            toplam = Sayi1 + Sayi2;
            Console.WriteLine(toplam);
            #endregion
        }
    }
}
