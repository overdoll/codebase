/**
 * @generated SignedSource<<5b85fcc367f716c7e4177469d4d55a51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadAudienceStepFragment$data = {
  readonly audience: {
    readonly id: string;
    readonly title: string;
  } | null;
  readonly " $fragmentType": "UploadAudienceStepFragment";
};
export type UploadAudienceStepFragment = UploadAudienceStepFragment$data;
export type UploadAudienceStepFragment$key = {
  readonly " $data"?: UploadAudienceStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadAudienceStepFragment">;
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

(node as any).hash = "dfac6fa315865e3772487bc1fceb85f6";

export default node;
