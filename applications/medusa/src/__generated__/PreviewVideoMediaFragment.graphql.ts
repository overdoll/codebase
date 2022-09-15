/**
 * @generated SignedSource<<ca27c8ef1072353d3fab3d83e2e7cd28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewVideoMediaFragment$data = {
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
  readonly " $fragmentType": "PreviewVideoMediaFragment";
};
export type PreviewVideoMediaFragment$key = {
  readonly " $data"?: PreviewVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewVideoMediaFragment">;
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
  "name": "PreviewVideoMediaFragment",
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

(node as any).hash = "5b2e3da7ad700291c3bc003524bfba45";

export default node;
