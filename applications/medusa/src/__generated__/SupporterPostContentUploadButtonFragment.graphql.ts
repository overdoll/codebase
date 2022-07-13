/**
 * @generated SignedSource<<0c4214856290afe8957f42ac57bc3c40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterPostContentUploadButtonFragment$data = {
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "SupporterPostContentUploadButtonFragment";
};
export type SupporterPostContentUploadButtonFragment$key = {
  readonly " $data"?: SupporterPostContentUploadButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterPostContentUploadButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterPostContentUploadButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporterOnly",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "1a0e239cbed759a6179279649b07cd38";

export default node;
