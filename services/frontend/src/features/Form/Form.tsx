import { useMutation, useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { weddingAPI } from '@shared/api';
import { TConfirmStatus } from '@shared/api/wedding-api';
import { useGetInviteData } from '@shared/hooks';
import { Button } from '@shared/ui/Button';
import s from './styles.module.scss';

type GuestFormValues = {
  confirmed: 'attending' | 'declined' | 'pending';
};

interface PostInviteParams {
  token: string;
  status: TConfirmStatus;
}

export const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GuestFormValues>({});

  const queryClient = useQueryClient();
  const { token } = useParams<{ token: string }>();
  const { inviteData } = useGetInviteData({ token });

  const animate = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsAnimating(false);
    }, 500);
  };

  const { mutate: postInvite, isPending: isPendingPostInvite } = useMutation({
    mutationFn: ({ token, status }: PostInviteParams) =>
      weddingAPI.confirmInvite({ token, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteData'] });

      animate();
    }
  });

  const onFormSubmit: SubmitHandler<GuestFormValues> = async (data) => {
    postInvite({ token: token || '', status: data.confirmed });
  };

  const shouldShowForm = !isSubmitted && inviteData?.confirmed === '';

  return (
    <div className={s.formWrapper}>
      <div
        className={cn(s.formContainer, {
          [s.formContainerExit]: isAnimating,
          [s.formContainerEnter]: !shouldShowForm && !isAnimating
        })}
      >
        {shouldShowForm ? (
          <form onSubmit={handleSubmit(onFormSubmit)} className={s.form}>
            <h3 className={s.formTitle}>АНКЕТА</h3>

            <div className={s.radioGroup}>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  value="attending"
                  {...register('confirmed', { required: 'Выберите вариант' })}
                  className={s.radioInput}
                />
                <span className={s.radioText}>Приду</span>
              </label>

              <label className={s.radioLabel}>
                <input
                  type="radio"
                  value="declined"
                  {...register('confirmed', { required: 'Выберите вариант' })}
                  className={s.radioInput}
                />
                <span className={s.radioText}>Не смогу</span>
              </label>

              <label className={s.radioLabel}>
                <input
                  type="radio"
                  value="pending"
                  {...register('confirmed', { required: 'Выберите вариант' })}
                  className={s.radioInput}
                />
                <span className={s.radioText}>Сообщу позже</span>
              </label>
            </div>

            {errors.confirmed && (
              <p className={s.errorMessage}>{errors.confirmed.message}</p>
            )}
            <Button
              type="submit"
              className={s.submitButton}
              disabled={isPendingPostInvite}
            >
              {isPendingPostInvite ? 'Отправка...' : 'Отправить'}
            </Button>
          </form>
        ) : (
          <div className={s.successMessage}>
            <span className={s.answerTitle}>Вы подтвердили приглашение!</span>
          </div>
        )}
      </div>
    </div>
  );
};
