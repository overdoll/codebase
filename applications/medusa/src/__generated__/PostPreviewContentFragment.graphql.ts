/**
 * @generated SignedSource<<1971b7e33d3c33d7a2f78c4fd644fba0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"InfoRawPostContentBannerFragment">;
  }>;
  readonly " $fragmentType": "PostPreviewContentFragment";
};
export type PostPreviewContentFragment$key = {
  readonly " $data"?: PostPreviewContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "InfoRawPostContentBannerFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "5c1f4092def3b5105ee93a72dbca61cd";

export default node;
