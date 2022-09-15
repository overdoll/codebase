/**
 * @generated SignedSource<<90680709af8cc97f22bf6256f2b497b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicVideoMediaFragment$data = {
  readonly aspectRatio: {
    readonly height: number;
    readonly width: number;
  };
  readonly containers: ReadonlyArray<{
    readonly __typename: "HLSVideoContainer";
    readonly url: string;
  } | {
    readonly __typename: "MP4VideoContainer";
    readonly url: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment" | "PosterImageMediaFragment">;
  };
  readonly duration: number;
  readonly hasAudio: boolean;
  readonly " $fragmentType": "CinematicVideoMediaFragment";
};
export type CinematicVideoMediaFragment$key = {
  readonly " $data"?: CinematicVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicVideoMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicVideoMediaFragment",
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
          "name": "BackgroundPosterImageMediaFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PosterImageMediaFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AspectRatio",
      "kind": "LinkedField",
      "name": "aspectRatio",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "duration",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "containers",
      "plural": true,
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
          "selections": (v0/*: any*/),
          "type": "HLSVideoContainer",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "MP4VideoContainer",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "VideoMedia",
  "abstractKey": null
};
})();

(node as any).hash = "811159f2f8e8df0c7c675da65d9d9f08";

export default node;
