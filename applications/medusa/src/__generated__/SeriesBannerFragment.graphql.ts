/**
 * @generated SignedSource<<2f715100196fdc5316187ec707c6ad50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "SeriesBannerFragment";
};
export type SeriesBannerFragment$key = {
  readonly " $data"?: SeriesBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesBannerFragment",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "429ad470c685e8464a9031f844032e83";

export default node;
