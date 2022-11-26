import { BenefitItem } from '@components/molecules/Subscription/Benefit/Item';
import FirstImage from '@assets/png/subscription/vector_3.png';
import { Grid } from '@mui/material';
import SecondImage from '@assets/png/subscription/vector_4.png';
import ThirdImage from '@assets/png/subscription/vector_2.png';

export function NewSuberBenefits() {
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <BenefitItem
          imageSrc={ThirdImage}
          title="داشتن نشان اعتماد"
          details="با داشتن نشان اعتماد از سمت بهترینو، متفاوت دیده شوید و با افزایش اعتماد مشتری‌های‌تان مشتریان بیشتر داشته باشید."
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <BenefitItem
          imageSrc={SecondImage}
          title="نمایش در صفحات بیشتر"
          details="با قابلیت افزودن کلیدواژه‌های بیشتر برای کسب‌وکارتان، در صفحه‌های مرتبط بیشتری نمایش داده شوید."
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <BenefitItem
          imageSrc={FirstImage}
          title="افزایش راه‌های ارتباطی بیشتر"
          details="با افزودن وب‌سایت و امکان چت واتس‌اپ، راه‌های ارتباطی مشتریان‌تان را راحت‌تر و بیشتر کنید."
        />
      </Grid>
    </Grid>
  );
}
