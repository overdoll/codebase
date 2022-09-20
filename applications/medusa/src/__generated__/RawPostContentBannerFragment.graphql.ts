/**
 * @generated SignedSource<<7d72f96dc84f9319f144533acfe33659>>
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
    readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment" | "ProcessingRawMediaFragment">;
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
          "name": "BannerMediaFragment"
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

(node as any).hash = "7d061e41597c36b3be92960c0d3b53f6";

export default node;
