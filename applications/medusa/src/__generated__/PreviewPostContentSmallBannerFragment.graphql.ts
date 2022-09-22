/**
 * @generated SignedSource<<e78c0d482eab7e1d2ae6aac714d77fe2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewPostContentSmallBannerFragment$data = {
  readonly media: {
    readonly __typename: string;
    readonly duration?: number;
    readonly " $fragmentSpreads": FragmentRefs<"SmallBannerMediaFragment">;
  };
  readonly " $fragmentType": "PreviewPostContentSmallBannerFragment";
};
export type PreviewPostContentSmallBannerFragment$key = {
  readonly " $data"?: PreviewPostContentSmallBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewPostContentSmallBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewPostContentSmallBannerFragment",
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
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "duration",
              "storageKey": null
            }
          ],
          "type": "VideoMedia",
          "abstractKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SmallBannerMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "d0e24b1c6118012a54c62f63fc581926";

export default node;
