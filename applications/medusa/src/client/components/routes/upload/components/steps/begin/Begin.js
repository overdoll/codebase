/**
 * @flow
 */
import type {Node} from 'react';
import Picker from '../../picker/Picker';
import {Frame} from '@//:modules/content';
import {Heading, Text} from '@//:modules/typography';
import {useTranslation} from 'react-i18next';
import {UploadDownload} from '@streamlinehq/streamline-bold/lib/internet-networks-servers';
import Icon from '@//:modules/content/icon/Icon';

type Props = {
    uppy: any,
    onAddFiles: any,
};

export default function Begin({uppy, onAddFiles}: Props): Node {
    const [t] = useTranslation('upload');

    return (
        <Frame>
            <Heading sx={{textAlign: 'left', fontSize: 5, mb: 2, mt: 2}}>
                {t('begin.header')}
            </Heading>
            <Text sx={{textAlign: 'left', fontSize: 3, color: 'neutral.100'}}>
                {t('begin.subheader')}
            </Text>
            <div
                sx={{
                    textAlign: 'center',
                    mt: 6,
                    mb: 6,
                    pt: 3,
                    pb: 3,
                    width: '100%',
                    backgroundColor: 'neutral.800',
                    borderRadius: 10,
                }}
            >
                <div
                    sx={{
                        ml: 3,
                        mr: 3,
                        pt: 6,
                        pb: 6,
                        borderColor: 'neutral.50',
                        borderWidth: 4,
                        borderStyle: 'solid',
                        borderRadius: 10,
                    }}
                >
                    <Picker uppy={uppy} onSelect={onAddFiles}>
                        <Icon
                            icon={UploadDownload.HarddriveUpload}
                            strokeWidth={2.5}
                            fill={'teal.200'}
                            size={48}
                            sx={{
                                display: 'block',
                                textAlign: 'center',
                                mb: 2,
                            }}
                        />
                        <Heading
                            sx={{
                                textAlign: 'center',
                                fontSize: 4,
                                color: 'teal.200',
                            }}
                        >
                            {t('begin.uploader')}
                        </Heading>
                        <Text
                            sx={{
                                textAlign: 'left',
                                fontSize: 1,
                                color: 'teal.100',
                            }}
                        >
                            {t('begin.limit')}
                        </Text>
                    </Picker>
                </div>
            </div>
            <Heading sx={{textAlign: 'left', fontSize: 3}}>
                {t('rules.header')}
            </Heading>
            <Text sx={{textAlign: 'left', fontSize: 1, color: 'neutral.100'}}>
                {t('rules.subheader')}
            </Text>
        </Frame>
    );
}
