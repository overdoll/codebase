/**
 * @generated SignedSource<<16a92c7b8c28abcc92619f441a33e15d>>
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
    readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment">;
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
          "name": "BannerMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "9db477c8754537ca02caa6bc82af6f5f";

export default node;
