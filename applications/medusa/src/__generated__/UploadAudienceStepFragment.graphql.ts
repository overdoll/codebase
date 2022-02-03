/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadAudienceStepFragment = {
    readonly audience: {
        readonly id: string;
        readonly title: string;
    } | null;
    readonly " $refType": "UploadAudienceStepFragment";
};
export type UploadAudienceStepFragment$data = UploadAudienceStepFragment;
export type UploadAudienceStepFragment$key = {
    readonly " $data"?: UploadAudienceStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadAudienceStepFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadAudienceStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'dfac6fa315865e3772487bc1fceb85f6';
export default node;
