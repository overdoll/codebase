/**
 * @generated SignedSource<<8caacb15fe18c69a479a082ebd44b7f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadAudienceStepFragment.graphql.ts
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
=======
export type AudienceFragment$data = {
  readonly audience: {
    readonly id: string;
    readonly title: string;
  } | null;
  readonly " $fragmentType": "AudienceFragment";
};
export type AudienceFragment = AudienceFragment$data;
export type AudienceFragment$key = {
  readonly " $data"?: AudienceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceFragment">;
>>>>>>> master:applications/medusa/src/__generated__/AudienceFragment.graphql.ts
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
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadAudienceStepFragment.graphql.ts
(node as any).hash = 'dfac6fa315865e3772487bc1fceb85f6';
=======

(node as any).hash = "126deb9c50d61d0ae365103c12492081";

>>>>>>> master:applications/medusa/src/__generated__/AudienceFragment.graphql.ts
export default node;
