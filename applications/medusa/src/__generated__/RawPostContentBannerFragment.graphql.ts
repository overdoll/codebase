/**
 * @generated SignedSource<<b28604fbad49609635d55b77d6f38e13>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawPostContentBannerFragment$data = {
  readonly media: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ProcessingRawMediaFragment" | "ThumbnailMediaFragment">;
  };
  readonly " $fragmentType": "RawPostContentBannerFragment";
};
export type RawPostContentBannerFragment$key = {
  readonly " $data"?: RawPostContentBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawPostContentBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawPostContentBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "media",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProcessingRawMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "6549524f098f63ca9f12dcfaffcd2295";

export default node;
