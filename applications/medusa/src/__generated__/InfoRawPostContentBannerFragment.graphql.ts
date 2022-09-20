/**
 * @generated SignedSource<<bd5b8ab6540ae0fb43f1788a3abdfe42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InfoRawPostContentBannerFragment$data = {
  readonly media: {
    readonly __typename: "VideoMedia";
    readonly cover: {
      readonly " $fragmentSpreads": FragmentRefs<"BannerImageMediaFragment">;
    };
    readonly duration: number;
    readonly hasAudio: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentSpreads": FragmentRefs<"RawPostContentBannerFragment">;
  readonly " $fragmentType": "InfoRawPostContentBannerFragment";
};
export type InfoRawPostContentBannerFragment$key = {
  readonly " $data"?: InfoRawPostContentBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"InfoRawPostContentBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InfoRawPostContentBannerFragment",
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
              "concreteType": "ImageMedia",
              "kind": "LinkedField",
              "name": "cover",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "BannerImageMediaFragment"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasAudio",
              "storageKey": null
            },
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RawPostContentBannerFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "bdad7751f5331811be1f60b54d43743e";

export default node;
